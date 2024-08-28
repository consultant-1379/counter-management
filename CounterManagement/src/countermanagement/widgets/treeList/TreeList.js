define([
    'jscore/core',
    'jscore/ext/utils/base/underscore',
    './TreeListListView',
    'i18n!countermanagement/dictionary.json',
    'dataviz/Tree',
    'dataviz/MillerColumns',
    'widgets/InlineMessage',
    '../listItem/ListItem',
    '../../utils/Utility'
], function(core, _, View, dictionary, Tree, MillerColumns, InlineMessage, ListItem, Utility) {
    'use strict';

    var filterStr = '';
    var PARENT = 'parent';
    var ROOT = 'null';
    var SELECT_END = 'selectend';

    return core.Widget.extend({


        selectedIds: [],
        expandedItems: [],

        view: function() {
            return new View({
                title: this.title,
                selected: dictionary.selected,
                selectAll: dictionary.selectAll,
                clear: dictionary.clear,
                totalItems: this.totalItems
            });
        },

        init: function(options) {
            this.title = options.title;
            this.message = options.message;
            this.onSelect = options.onSelect;
            this.initData(options);

        },

        onViewReady: function() {
            this.initializeFilter();

            this.changeView();
            core.Window.addEventHandler('resize', this.resize.bind(this));

            this.view.getClearSelectionLink().addEventHandler('click', this.onClearAll.bind(this));
        },

        initData: function(options) {
            this.items = options.items;
            this.totalItems = options.totalRoots;
            this.data = Utility.groupByProperty(this.items, PARENT);
            this.dataMap = {};

            this.items.forEach(function(item) {
                this.dataMap[item.id] = item;
            }.bind(this));

            this.currentData = Utility.groupByProperty(this.items, PARENT);
            this.totalRootItems = Array.isArray(this.currentData[ROOT]) ? this.currentData[ROOT].length : 0;
            this.ids = options.items.map(function(item) {
                return item.id;
            });
        },

        load: function(data) {
            this.initData(data);
            this.view.setTitleCount(this.getTotalChildren());
            this.changeView();
        },

        onSelectAll: function() {
            this.visualisation.select(this.ids);
        },

        onClearAll: function() {
            this.visualisation.unselectAll();
        },

        onDestroy: function() {

        },

        resize: function() {
            if (this.visualisation) {
                var height = core.Window.getProperty('innerHeight') -  310;
                this.view.getTreeArea().setStyle('height', height + 'px');
                this.visualisation.redraw();
            }
        },

        changeView: function() {
            destroyVisualization.call(this);
            destroyInlineMessage.call(this);

            // wrap in a try catch as the serialized expanded items could be inconsistent with the data
            if (this.items.length > 0 && this.totalRootItems > 0) {
                try {

                    this.visualisation = createVisualisation.call(this);
                    // expand the element before adding the event
                    applyPreviouslyExpandedItems.call(this);

                    // this.unsubscribeVisualisationEvents();
                    showClearLink.call(this, this.selectedIds);

                    // re-select
                    this.visualisation.select(this.selectedIds);

                    // inside timeout otherwise selection above is being triggered
                    setTimeout(function() {
                        this.subscribeVisualisationEvents();
                    }.bind(this), 100);

                    this.view.showTreeArea();
                    this.view.hideMessageArea();
                    this.visualisation.attachTo(this.view.getTreeContent());
                    this.resize();
                } catch (e) {
                    console.error(e);
                }
            }
            else if (this.items.length > 0 && this.totalRootItems === 0) {

                if (this.isFilterOn) {
                    this.inlineMessage = createInlineMessage(this.message.filter);
                    this.inlineMessage.attachTo(this.view.getTreeContent());

                } else {
                    this.showInlineMessage(this.message.notAvailable);
                }

            }
            else {
                this.showInlineMessage(this.message.nodeNotSelected);
            }
        },

        showInlineMessage: function(message) {
            this.inlineMessage = createInlineMessage(message);
            this.inlineMessage.attachTo(this.view.getMessageArea());
            this.view.hideTreeArea();
            this.view.showMessageArea();
        },

        handleSelection: function(ids) {
            var uiSelection = [];
            var effectiveSelection = [];
            //Do something on selection ids
            ids.forEach(function(id) {
                if (this.dataMap[id].children > 0) {
                    // newSelections.push(id);
                    var childrenIds = this.data[id].map(function(child) {
                        return child.id;
                    });
                    uiSelection.push(id);
                    uiSelection = _.union(uiSelection, childrenIds);
                    effectiveSelection = _.union(effectiveSelection, childrenIds);
                } else {
                    uiSelection.push(id);
                    effectiveSelection.push(id);
                }
            }.bind(this));
            // console.log('selection : ', uiSelection);
            // console.log('effectiveSelection : ', effectiveSelection);

            this.unsubscribeVisualisationEvents();

            //re selects
            this.select(uiSelection);

            // inside timeout otherwise selection above is being triggered
            setTimeout(function() {
                this.subscribeVisualisationEvents();
            }.bind(this), 100);

            showClearLink.call(this, uiSelection);

            this.onSelect(effectiveSelection);
        },

        select: function(objectsId) {
            this.visualisation.unselectAll();
            this.visualisation.select(objectsId);
        },

        subscribeVisualisationEvents: function() {
            var selectEventId = this.visualisation.addEventHandler(SELECT_END, this.handleSelection.bind(this));

            // replace unsubscribe events function
            this.unsubscribeVisualisationEvents = function() {
                this.visualisation.removeEventHandler(SELECT_END, selectEventId);
            };
        },

        unsubscribeFilterEvents: function() {

        },

        getDataFromMapper: function(data, ids) {
            console.log('data got from other side', data);
            this.currentData = (data && data.length > 0 || (ids && ids.length > 0)) ? Utility.groupByProperty(data, PARENT) : Utility.groupByProperty(this.items, PARENT);
            this.totalRootItems = this.currentData[ROOT] ? this.currentData[ROOT].length : 0;
            this.selectedIds = this.visualisation ? this.visualisation.getSelectedIds() : [];
            this.expandedItems = this.visualisation ? this.visualisation.getExpansions() : [];
            this.view.setTitleCount(this.getTotalChildren());
            this.changeView();
        },

        initializeFilter: function() {
            this.filterInput = this.view.getFilterInput();
            this.filterIcon = this.view.getFilterIconButton();
            var currentTimeout;
            var onFilterChange = function() {
            // unselect the item when the filter change.
            // prevents having any selection hidden by filtering

                if (this.visualisation) {
                    this.visualisation.unselectAll();
                }

                if (currentTimeout !== undefined) {
                    clearTimeout(currentTimeout);
                }

                // defer the event to allow the user to filter on key input
                // use of timeout to reduce the impact on data processing
                currentTimeout = setTimeout(function() {
                    filterStr = this.filterInput.getValue().trim();
                    this.isFilterOn = !!filterStr;
                    this.view.showFilterIconButton(filterStr);
                    this.currentData = this.filterData(filterStr);
                    this.selectedIds = this.visualisation ? this.visualisation.getSelectedIds() : [];
                    this.expandedItems = this.visualisation ? this.visualisation.getExpansions() : [];
                    this.totalRootItems = (this.currentData && this.currentData[ROOT]) ?  this.currentData[ROOT].length : 0;
                    this.view.setTitleCount(this.getTotalChildren());
                    this.changeView();
                }.bind(this), 300);
            }.bind(this);

            this.onFilterClear = function() {
                this.isFilterOn = false;
                this.filterInput.setValue('');
                this.filterInput.focus();
                onFilterChange();
            }.bind(this);

            this.filterInput.addEventHandler('input', onFilterChange);
            this.filterIcon.addEventHandler('click', this.onFilterClear);
        },

        onFilterClear: function() {

        },

        filterData: function(filter) {
            var lowCaseFilter = filter ? filter.toLowerCase() : '';
            var filteredData = {};
            var roots = [];

            if (!filteredData[ROOT]) {
                filteredData[ROOT] = [];
            }

            //Filter the data
            _.keys(this.data).forEach(function(group) {
                if (group === ROOT) {
                    roots = _.filter(this.data[group], function(item) {
                        return new RegExp(lowCaseFilter).test(item.label.toLowerCase());
                    }.bind(this));

                    filteredData[ROOT] = _.union(filteredData[ROOT], roots);
                } else {
                    filteredData[group] = _.filter(this.data[group], function(item) {
                        return new RegExp(lowCaseFilter).test(item.label.toLowerCase());
                    }.bind(this));

                    if (filteredData[group].length > 0) {
                        var isParentExist = _.find(filteredData[ROOT], function(parent) {
                            return parent.id === filteredData[group][0].parent;
                        });

                        if (!isParentExist) {
                            filteredData[ROOT].push(this.dataMap[filteredData[group][0].parent]);
                        }
                    }
                }
            }.bind(this));

            //handle root filter
            roots.forEach(function(root) {
                filteredData[root.id] =  this.data[root.id] ? this.data[root.id] : [];
            }.bind(this));

            //handle null
            filteredData[ROOT].forEach(function(child) {
                if (filteredData[child.id]) {
                    child.children = filteredData[child.id].length;
                }
            });

            return filteredData;
        },

        getTotalChildren: function() {
            var totalItems = _.keys(this.currentData).reduce(function(acc, cur) {
                return acc += this.currentData[cur].length;
            }.bind(this), 0);

            return (this.totalRootItems === totalItems) ? this.totalRootItems : totalItems - this.totalRootItems;
        }
    });

    function createInlineMessage(message) {
        return new InlineMessage({
            icon: 'infoMsgIndicator',
            header: message
        });
    }

    function createVisualisation() {
        return new Tree({
            /* jshint validthis:true */
            getData: queryData.bind(this),
            getIds: function(query, success, error) {
                queryData.call(this, query, success, error, true);
            }.bind(this),
            totalRootItems: this.totalRootItems,
            checkboxes: true,
            selectable: true,
            multiselect: true,
            bindselect: true,
            recursive: false,
            itemType: ListItem,
            customItemEvents: ['select']
        });

    }

    function queryData(queries, success, error, idsOnly) {
        var output = [];
        /* jshint validthis:true */
        queries.forEach(function(query) {
            var items = getItemsByParentId.call(this, query.parent)
                .map(function(obj) {
                    return idsOnly ? obj.id : obj;
                });

            output.push({
                parent: query.parent,
                items: items.splice(query.offset, query.limit)
            });
        }.bind(this));

        success(JSON.parse(JSON.stringify(output)));
    }

    function getItemsByParentId(id) {
        /* jshint validthis:true */
        if (this.currentData[id]) {
            return this.currentData[id];
        } else {
            return [];
        }
    }

    function showClearLink(selectionIds) {
        /* jshint validthis:true */
        this.view.getSelectedNum().setText(selectionIds.length);
        if (selectionIds.length > 0) {
            this.view.showClearSelection();
        } else {
            this.view.hideClearSelection();
        }
    }

    function destroyVisualization() {
        /* jshint validthis:true */
        if (this.visualisation !== undefined) {
            this.unsubscribeVisualisationEvents();
            this.visualisation.destroy();
            this.visualisation = undefined;
        }
    }

    function destroyInlineMessage() {
        /* jshint validthis:true */
        if (this.inlineMessage !== undefined) {
            this.inlineMessage.destroy();
            this.inlineMessage = undefined;
        }
    }

    function applyPreviouslyExpandedItems() {
        /* jshint validthis:true */
        var visualisation = this.visualisation,
            expandedItems = this.expandedItems;

        if (!expandedItems) {
            return;
        }

        expandedItems.forEach(function(item) {
            visualisation.expand(item);
        });
    }

});
