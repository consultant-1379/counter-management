define([
    'jscore/core',
    'jscore/ext/locationController',
    'i18n!countermanagement/dictionary.json',
    'i18n/number',
    './CounterTableView',

    'tablelib/Table',
    'tablelib/plugins/ResizableHeader',
    'tablelib/plugins/Selection',
    'tablelib/plugins/SortableHeader',
    'tablelib/plugins/StickyScrollbar',
    'tablelib/plugins/FixedHeader',

    './CounterTableColumns',
    './CounterTableLayout',
    '../emptyListMessage/EmptyListMessage',

], function(core, LocationController, dictionary, number, View,
    Table,  ResizableHeader, Selection, SortableHeader, StickyScrollbar, FixedHeader,
    CounterTableColumns, CounterTableLayout, EmptyListMessage
) {
    var SELECTED_ROW_INFO = 'selectedCounterRowInfo';
    var SCROLL_POSITIONS = 'scrollPositionOfCounter';

    return core.Widget.extend({
        View: View,
        tableWidget: null,
        filters: {},

        onViewReady: function(options) {
            this.options = options;
            this.flexCounters = options.data;
            this.counterTableLayout = new CounterTableLayout();
            this.selectedRows = this.selectedStack = [];
            this.lastSelectedCounterName = null;

            if (this.options) {
                if (this.options.data.length === 0) {
                    this.createEmptyListMessage();
                    this.view.hideTableHeaderRight();
                } else {
                    this.counterTableColumns = new CounterTableColumns({
                        tableLayout: this.counterTableLayout.initializeTableLayout()
                    });
                    this.orderedColumns = this.counterTableColumns.getOrderedColumns().columns;
                    // retrieve selectedRowInfo from sessionStorage
                    this.sessionStoredCounter = JSON.parse(sessionStorage.getItem(SELECTED_ROW_INFO));
                    this.drawTable(this.flexCounters, this.orderedColumns);
                    this.view.showTableHeaderRight();
                }
                this.addEventHandlers();
            }

            this.height = window.innerHeight;
            this.resizeHandler();
            this.checkForFilters(this.filters);

            // Update count of counters and Selected Rows on refresh
            if (this.tableWidget) {
                this.updateCountOnFilter(this.tableWidget.getRows().length);
                this.view.setSelectCount(number(this.tableWidget.getSelectedRows().length).format('0,0'));
            }
        },

        /**
         * On selection of the clear selected button, counter is reset, the table is reset and session storage values removed.
         *
         * @method clearSelected
         */
        clearSelected: function() {
            this.tableWidget.unselectAllRows();
            this.view.setSelectCount(0);
            this.sessionStoredCounter = [];
            this.selectedRows = this.selectedStack = [];
            this.sendSelection(null);
            this.addRemoveSelectClearButton();
        },

        /**
         * For handling the resize of the window
         *
         * @method resizeHandler
         */
        resizeHandler: function() {
            core.Window.addEventHandler('resize', function() {
                setTimeout(function() {
                    this.resizeTable();
                }.bind(this), 300);
            }.bind(this));
        },

        /**
         * @method resizeTable
         */
        resizeTable: function() {
            if (this.height !== window.innerHeight) {
                this.height = window.innerHeight;
                var tableHeight = (((Math.floor((window.innerHeight - 192) / 32)) * 32) - 66);
                this.view.getTableWrapper().setStyle('height', ((tableHeight) + 'px'));
            }
        },

        addEventHandlers: function() {
            this.view.getFilterInput().addEventHandler('input', function() {
                this.applyColumnFilter('counterName', this.view.getFilterInput().getValue(), '=');
            }.bind(this));

            this.view.getSelectClear().addEventHandler('click',this.clearSelected.bind(this));
            this.view.getFilterClear().addEventHandler('click', this.resetAllFilters.bind(this));
        },

        /**
         * Updates the count for the number of Counters when filtering
         *
         * @method updateCountOnFilter
         * @param count
         */
        updateCountOnFilter: function(count) {
            this.view.getListCount().setText(number(count).format('0,0'));
        },

        createEmptyListMessage: function() {
            this.emptyListMessage = new EmptyListMessage();
            this.emptyListMessage.attachTo(this.view.getTableContainer());
        },

        /**
         * Draws the Counter Table.
         * @drawTable
         * @param flexCounters
         * @param columns
         */
        drawTable: function(flexCounters, columns) {
            if (this.tableWidget) {
                this.tableWidget.destroy();
            }

            this.flexCounters = flexCounters;
            this.orderedColumns = columns;

            if (flexCounters && flexCounters.length > 0) {
                this.counterArray = this.parseCountersToTableData(flexCounters);
            }

            this.tableWidget = new Table({
                plugins: [
                    new StickyScrollbar(),
                    new Selection({
                        checkboxes: true,
                        selectableRows: true,
                        multiselect: true,
                        bind: true
                    }),
                    new ResizableHeader(),
                    new SortableHeader(),
                    new FixedHeader()
                ],
                columns: columns,
                data: this.counterArray
            });

            this.tableWidget.attachTo(this.view.getTableBody());
            this.updateFilterData(this.orderedColumns);

            this.applyColumnOrder(this.orderedColumns);
            //default sorting with
            this.applyColumnSorting('dsc', 'modifiedDate');
            this.view.setTableHeight(this.tableWidget.getData());

            this.addTableEventHandler();
            this.view.hideErrorContainer();
            this.view.showTableContainer();
        },

        /**
         * once widget attached to the DOM
         * set x and y scroll positions
         */
        onDOMAttach: function() {
            var readScrollPosition = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS));
            // setting scroll position
            if (readScrollPosition) {
                this.view.setScrollPosition(readScrollPosition);
            }
        },

        applyColumnFilter: function(attribute, value, comparator) {
            this.filters[attribute] = {value: value, comparator: comparator};
            if (this.filters[attribute].value === '') {
                this.resetTableData();
            } else {
                this.setTableData(this.counterArray);
            }
            this.checkForFilters(this.filters);
            this.reSelectRows();
            this.view.setTableHeight(this.tableWidget.getData());
        },

        addTableEventHandler: function() {
            this.tableWidget.addEventHandler('sort', function(sortMode, sortAttr) {
                this.applyColumnSorting(sortMode, sortAttr);
            }.bind(this));

            this.tableWidget.addEventHandler('rowselect', function(selectedRow,  isSelected) {
                this.onSelect(selectedRow, isSelected);
            }.bind(this));

            this.tableWidget.addEventHandler('rowselectend', function(selectedRows) {
                this.onSelectEnd(selectedRows);
            }.bind(this));

            this.tableWidget.addEventHandler('check', function(selectedRow, isSelected) {
                this.onSelect(selectedRow, isSelected);
            }.bind(this));

            this.tableWidget.addEventHandler('checkend', function(selectedRows) {
                this.onSelectEnd(selectedRows);
            }.bind(this));

            this.tableWidget.addEventHandler('checkheader', function(selectedRows, isChecked) {
                this.onSelectAll(selectedRows, isChecked);
            }.bind(this));

            this.tableWidget.addEventHandler('columnresize', function(data) {
                this.counterTableLayout.setColumnWidth(data.attribute, data.width);
            }.bind(this));

            this.view.getTableWrapper().addEventHandler('scroll', function() {
                var getYPosition = this.view.getTableWrapper().getProperty('scrollTop');
                var getXPosition = this.view.getTableWrapper().getProperty('scrollLeft');

                // storing scroll position in session with key : value - scrollPositionOfCounter table : [100,200]
                sessionStorage.setItem(SCROLL_POSITIONS, JSON.stringify([getXPosition,getYPosition]));
            }.bind(this));
        },

        updateFilterData: function(columns) {
            var filters;
            for (var i=0; i < columns.length;i++) {
                filters = JSON.parse(sessionStorage.getItem(columns[i].attribute));
                if (filters && filters[columns[i].attribute].value !== '') {
                    if (columns[i].visible === true) {
                        this.filters = filters;
                        this.tableWidget.setData(this.filterData(this.counterArray));
                    }
                } else if (filters && filters[columns[i].attribute].value === '') {
                    this.resetTableData();
                }
            }
            this.updateCountOnFilter(this.tableWidget.getRows().length);
        },

        resetTableData: function() {
            this.counterArray = this.parseCountersToTableData(this.flexCounters);
            this.setTableData(this.counterArray);
        },

        setTableData: function(counterArray) {
            var tableData = this.filterData(counterArray);
            if (this.sortMode && this.sortAttr) {
                tableData = this.sortTableRows(tableData, this.sortMode, this.sortAttr);
            }
            this.tableWidget.setData(tableData);
            this.updateCountOnFilter(tableData.length);
        },

        parseCountersToTableData: function(arrayToParse) {
            var tableData = [];

            arrayToParse.forEach(function(counter) {
                tableData.push({
                    'counterName': counter.flexCounterName,
                    'createdBy': counter.createdBy ,
                    'moClass': counter.baseCounter.sourceObject,
                    'modifiedDate': counter.modified.toString(),
                    'status': counter.status
                });
            });
            return tableData;
        },

        /**
         * Loops through the existing table rows and re-selects rows that have already been selected.
         * This is used when table settings applied or sorting on columns
         */
        reSelectRows: function() {
            this.selectedRows.forEach(function(row) {
                this.tableWidget.selectRows(function(model) {
                    if (row.flexCounterName === model.getData().counterName) {
                        return true;
                    }
                }.bind(this));
            }.bind(this));
        },

        applyColumnOrder: function(columns) {
            var applyColumnValues = this.counterTableColumns.tableLayout.attributes.tableColumns;
            var newColumnArray = {};
            columns.forEach(function(col) {
                newColumnArray[col.attribute] = applyColumnValues[col.attribute];
            });

            this.counterTableLayout.attributes = {tableColumns: newColumnArray};
        },

        applyColumnSorting: function(sortMode, sortAttr) {

            this.sortMode = sortMode === 'asc'? -1 : 1;
            this.sortAttr = sortAttr;
            var counterArray = this.tableWidget.getData();
            counterArray = this.sortTableRows(counterArray, this.sortMode, this.sortAttr);
            this.tableWidget.setData(counterArray);
            this.counterTableLayout.setColumnSort(sortAttr, this.sortMode === 1 ? 'desc' : 'asc');
            this.reSelectRows();
            this.view.setTableHeight(this.tableWidget.getData());
            this.tableWidget.setSortIcon(sortMode, sortAttr);

        },

        filterData: function(data) {
            var results = data;
            var filters = this.filters;
            for (var attr in filters) {
                sessionStorage.setItem(attr, JSON.stringify(this.filters));
                results = this.filterResults(results, filters, attr);
            }
            return results;
        },

        /**
         * @method filterResults
         * @param results
         * @param filters
         * @param attr
         * @returns {*}
         */
        filterResults: function(results, filters, attr) {
            results = results.filter(function(obj) {
                var objectAttribute = (obj[attr] === undefined || obj[attr] === null ? '' : obj[attr]);
                if (filters[attr].value) {
                    return objectAttribute.toString().toLowerCase().indexOf(filters[attr].value.toLowerCase()) > -1;
                } else {
                    return true;
                }
            });
            return results;
        },

        sortTableRows: function(counterArray, sortMode, sortAttr) {
            counterArray.sort(function(a, b) {
                //if null we set to empty string
                var aAttr = a[sortAttr];
                var bAttr = b[sortAttr];

                aAttr = aAttr.toString().toLowerCase();
                bAttr = bAttr.toString().toLowerCase();
                if (aAttr < bAttr) {
                    return 1 * sortMode;
                } else if (aAttr > bAttr) {
                    return -1 * sortMode;
                } else {
                    return 0;
                }
            }.bind(this));
            return counterArray;
        },

        /**
         * update the selected rows in session
         */
        updateSelectedRows: function() {
            var selectedlist = [];
            if (this.tableWidget.getSelectedRows().length >= 1) {
                this.tableWidget.getSelectedRows().forEach(function(row) {
                    selectedlist.push(row.getData().counterName);
                    sessionStorage.setItem(SELECTED_ROW_INFO, JSON.stringify(selectedlist));
                    this.options.data.forEach(function(model) {
                        if (model.flexCounterName === row.getData().counterName) {
                            if (this.selectedRows.indexOf(model) === -1) {
                                this.selectedRows.push(model);
                            }
                        }
                    }.bind(this));
                }.bind(this), selectedlist);
            } else {
                sessionStorage.removeItem(SELECTED_ROW_INFO);
            }
            this.addRemoveSelectClearButton();
        },

        /**
         * read counterName from session
         * matching with total counters data for persist
         */
        populateSelectedRows: function() {
            this.sessionStoredCounter.forEach(function(counterName) {
                this.flexCounters.forEach(function(model) {
                    if (model.flexCounterName === counterName) {
                        if (this.selectedRows.indexOf(model) === -1) {
                            this.selectedRows.push(model);
                        }
                    } else {
                        sessionStorage.removeItem(SELECTED_ROW_INFO);
                    }
                }.bind(this));
            }.bind(this));
        },

        /**
         * Iterates through all the filter fields. If filters are applied then the filter clear button is shown.
         * Otherwise the filter clear button is hidden.
         *
         * @method checkForFilters
         * @param filters
         */
        checkForFilters: function(filters) {
            var allFiltersAreClear = true;

            for (var key in filters) {
                var attribute = filters[key];
                if (attribute.value !== '') {
                    allFiltersAreClear = false;
                }
            }

            if (allFiltersAreClear === true) {
                this.view.hideFilterClear();
            } else {
                this.view.showFilterClear();
            }
        },

        /**
         * If row(s) selected then the select clear button is shown. Otherwise it is hidden.
         *
         * @method addRemoveSelectClearButton
         */
        addRemoveSelectClearButton: function() {
            if (this.checkIfRowsSelected()) {
                this.view.showSelectClear();
            }
            else {
                this.view.hideSelectClear();
            }
        },

        /**
         * On selection of clear filters button, all filters and table are reset, session storage values removed.
         *
         * @method resetAllFilters
         */
        resetAllFilters: function() {
            // Clear filter fields, hide clear filter button, uncheck real time filter checkbox, reset table data and reset filter
            this.filters = {};
            this.view.setFilterInput('');
            this.view.hideFilterClear();
            this.resetTableData();
            if (this.checkIfRowsSelected()) {
                this.reSelectRows();
            }

            // Clear filters from session storage
            for (var i = 0; i < this.tableWidget._columns.length; i++) {
                if (sessionStorage.getItem(this.tableWidget._columns[i].attribute) !== null) {
                    sessionStorage.removeItem(this.tableWidget._columns[i].attribute);
                }
            }
        },

        /**
         * @method checkIfRowsSelected
         * @returns boolean
         */
        checkIfRowsSelected: function() {
            var count = this.getSelectedRows().length;
            return (count>0);
        },

        /**
         * @method getSelectedRows
         * @returns {*}
         */
        getSelectedRows: function() {
            return this.selectedRows;
        },

        /**
         * On selecting/unselecting Select All checkbox
         * @method onSelect
         *
         */
        onSelectAll: function(selectedRows, isChecked) {
            if (!isChecked) {
                this.selectedStack = [];
            }
        },

        /**
         * On selecting/unselecting each row either by checkbox/ row selection [For maintaining the last selection]
         * @method onSelect
         *
         */
        onSelect: function(selectedRow, isSelected) {
            var counterName = selectedRow.options.model.counterName;
            var index = this.selectedStack.indexOf(counterName);
            if (index !== -1) {
                this.selectedStack.splice(index, 1);
            }
            if (isSelected) {
                this.selectedStack.push(counterName);
            }
        },

        /**
         * On every selection action either by checkbox/ row selection
         * @method onSelect
         *
         */
        onSelectEnd: function(selectedRows) {
            this.selectedRows = [];
            this.view.setSelectCount(number(selectedRows.length).format('0,0'));
            this.updateSelectedRows();
            var selectedCounterName = (selectedRows.length > 0) ? this.selectedStack[this.selectedStack.length - 1] : null;
            this.sendSelection(selectedCounterName);
        },

        /**
         * On selecting/unselecting rows,send the details
         * @method sendSelection
         *
         */
        sendSelection: function(counterName) {
            if (counterName !== this.lastSelectedCounterName) {
                this.lastSelectedCounterName = counterName;
                this.trigger('counterSelected', counterName);
            }
        }
    });
});
