define([
    'jscore/core',
    'jscore/ext/utils/base/underscore',
    'i18n!countermanagement/dictionary.json',
    './FilterCounterMappingView',
    '../treeList/TreeList',
    '../../utils/Utility'
], function(core, _, dictionary, View, TreeList, Utility) {
    'use strict';

    return core.Widget.extend({

        View: View,
        
        COUNTER: 'counter',
        FILTER: 'filter',

        mappedEvents: {},
        event: {
            counter: {},
            filter: {}
        },
        map: {
            counter: {},
            filter: {}
        },

        init: function(options) {
            this.prepareData(options);
        },

        onViewReady: function() {
            var flexFilters = Utility.convertToTreeItem(this.flexFilters, this.FILTER);

            this.flexFilter = new TreeList({
                title: dictionary.flexFilter.title,
                message: dictionary.flexFilter.message,
                onSelect: this.onSelectFlexFilters.bind(this),
                items: flexFilters,
                totalRoots: flexFilters.length
            });

            this.baseCounter = new TreeList({
                title: dictionary.baseCounters.title,
                message: dictionary.baseCounters.message,
                onSelect: this.onSelectBaseCounters.bind(this),
                items: Utility.convertToTreeItem(this.baseCounters, this.COUNTER),
                totalRoots: this.baseCounters.length
            });

            this.flexFilter.attachTo(this.view.getFlexFilter());
            this.baseCounter.attachTo(this.view.getBaseCounter());

        },

        load: function(data) {
            this.prepareData(data);

            this.baseCounter.load({
                items: Utility.convertToTreeItem(data.baseCounters, this.COUNTER),
                totalRoots: data.baseCounters.length
            });
            this.flexFilter.load({
                items: Utility.convertToTreeItem(data.flexFilters, this.FILTER),
                totalRoots: data.flexFilters.length
            });

        },

        prepareData: function(options) {
            this.baseCounters = options.baseCounters || [];
            this.flexFilters = options.flexFilters || [];
            this.events =  options.events || [];
            this.map[this.COUNTER] = Utility.getMapObject(options.baseCounters, 'baseCounterName');
            this.map[this.FILTER] = Utility.getMapObject(options.flexFilters, 'flexGroupId');

            this.PrepareMappingData();
            this.prepareEventMapData();
        },

        onSelectFlexFilters: function(ids) {
            console.log('selected FlexFilters, data coming from FlexFilters : ', ids);
            this.baseCounter.getDataFromMapper(this.getTreeByType(ids, this.COUNTER), ids);
        },

        onSelectBaseCounters: function(ids) {
            console.log('selected BaseCounters, data coming from BaseCounters : ', ids);
            this.flexFilter.getDataFromMapper(this.getTreeByType(ids, this.FILTER), ids);
        },

        PrepareMappingData: function() {
            if (this.baseCounters) {
                this.baseCounters.forEach(function(baseCounter) {
                    baseCounter.basedOnEvent.forEach(function(eventName) {
                        if (!this.mappedEvents[eventName]) {
                            this.mappedEvents[eventName] = {};
                        }

                        if (!this.mappedEvents[eventName].counter) {
                            this.mappedEvents[eventName].counter = [];
                        }

                        var counter = this.mappedEvents[eventName].counter;

                        if (counter.indexOf(baseCounter.baseCounterName) === -1) {
                            counter.push(baseCounter.baseCounterName);
                        }


                    }.bind(this));
                }.bind(this));
            }

            if (this.events) {
                this.events.forEach(function(eventData) {
                    eventData.applicableFlexGroupIds.forEach(function(flexGroupId) {
                        if (!this.mappedEvents[eventData.eventName]) {
                            this.mappedEvents[eventData.eventName] = {};
                        }

                        if (!this.mappedEvents[eventData.eventName].filter) {
                            this.mappedEvents[eventData.eventName].filter = [];
                        }

                        var filter = this.mappedEvents[eventData.eventName].filter;

                        if (filter.indexOf(flexGroupId) === -1) {
                            filter.push(flexGroupId);
                        }

                    }.bind(this));
                }.bind(this));
            }

        },

        prepareEventMapData: function() {
            if (this.events) {
                this.events.forEach(function(eventName) {
                    eventName.applicableFlexGroupIds.forEach(function(flexGroup) {
                        if (!this.event[this.FILTER]) {
                            this.event[this.FILTER] = {};
                        }
                        if (!this.event[this.FILTER][flexGroup]) {
                            this.event[this.FILTER][flexGroup] = [];
                        }

                        this.event[this.FILTER][flexGroup].push(eventName.eventName);
                    }.bind(this));
                }.bind(this));
            }

            if (this.baseCounters) {
                this.baseCounters.forEach(function(baseCounter) {
                    if (!this.event[this.COUNTER]) {
                        this.event[this.COUNTER] = {};
                    }

                    if (!this.event[this.COUNTER][baseCounter.baseCounterName]) {
                        this.event[this.COUNTER][baseCounter.baseCounterName] = baseCounter.basedOnEvent;
                    }
                }.bind(this));
            }
        },

        getTreeByType: function(idData, type) {
            var data = [];
            var dataFinal = [];
            var ids = idData || [];
            ids.forEach(function(id, i) {
                if (this.event[Utility.invertType(type)][id]) {
                    this.event[Utility.invertType(type)][id].forEach(function(eventName, index) {
                        if (index === 0) {
                            data = this.mappedEvents[eventName][type];
                        } else {
                            data = _.union(data, this.mappedEvents[eventName][type]);
                        }
                    }.bind(this));

                    if (i === 0) {
                        dataFinal = data;
                    } else {
                        dataFinal = _.intersection(dataFinal, data);
                    }
                }
                else {
                    //event couldn't find
                    dataFinal =  [];
                }

            }.bind(this));

            var fullObj = dataFinal.map(function(name) {
                return this.map[type][name];
            }.bind(this));

            return Utility.convertToTreeItem(fullObj, type);
        }
    });
});


