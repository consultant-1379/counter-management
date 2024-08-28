define([
    'jscore/core',
    './FlexCounterCreateView',
    'i18n!countermanagement/dictionary.json',
    '../../widgets/nodeTypeSelect/NodeTypeSelect',
    '../../widgets/filterCounterMapping/FilterCounterMapping',
    './Rest',
    'widgets/Loader',
    '../../utils/ErrorHandling'
], function(core, View, dictionary, NodeTypeSelect, FilterCounterMapping, Rest, Loader, ErrorHandling) {
    'use strict';

    var RADIO_NODE = 'RadioNode';

    return core.Region.extend({

        View: View,
        flexGroups: [],
        events: [],
        baseCounters: [],

        onStart: function() {
            this.nodeTypeSelect = this.initNodeTypeSelect();
            this.initFilterCounterMapping();

            if (this.nodeTypeSelect) {
                this.nodeTypeSelect.dropDown.addEventHandler('click', function() {
                }.bind(this));
                this.nodeTypeSelect.dropDown.addEventHandler('change', function() {
                    this.showLoader();
                    this.loadBaseCounters(this.nodeTypeSelect.dropDown.getValue().name)
                        .then(
                            function(baseCounters) {
                                this.baseCounters = baseCounters;
                                return this.loadFlexFilterGroups();
                            }.bind(this))
                        .then(
                            function(data) {
                                this.flexGroups = data.flexGroups;
                                this.events = data.events;
                                this.filterCounterMapping.load({
                                    flexFilters: this.flexGroups,
                                    baseCounters: this.baseCounters,
                                    events: this.events
                                });
                                this.hideLoader();
                            }.bind(this))
                        .catch(
                            function(error) {
                                this.hideLoader();
                                ErrorHandling.handle(error);
                            }.bind(this));
                }.bind(this));
            }
        },

        onViewReady: function() {
            this.loadDropdownItems();
        },

        initNodeTypeSelect: function() {
            var selectBoxWidget = new NodeTypeSelect({
                data: {
                    value: {name: dictionary.selectNodeType, value: '', title: dictionary.selectNodeType},
                    items: []
                }
            });

            selectBoxWidget.attachTo(this.view.getNodeTypeSelect());
            return selectBoxWidget;
        },

        initFilterCounterMapping: function() {
            if (this.filterCounterMapping) {
                this.filterCounterMapping.destroy();
                this.filterCounterMapping = null;
            }
            this.filterCounterMapping = new FilterCounterMapping({
                baseCounters: this.baseCounters,
                flexFilters: this.flexGroups,
                events: this.events
            });

            this.filterCounterMapping.attachTo(this.view.getFilterCounterMapping());
        },

        showLoader: function() {
            this.hideLoader();
            this.loader = new Loader();
            this.loader.attachTo(this.view.getFilterCounterMapping());
        },

        hideLoader: function() {
            if (this.loader) {
                this.loader.destroy();
                this.loader = null;
            }
        },

        loadFlexFilterGroups: function() {
            return Rest.getFlexFilterGroups();
        },

        loadBaseCounters: function(nodeName) {
            return Rest.getBaseCounters(nodeName);
        },

        loadDropdownItems: function() {
            return Rest.getRadioNodes().then(function(response) {
                var items = [];
                if (Array.isArray(response)) {
                    items = response.map(function(node) {
                        return {name: node, value: node, title: node, icon: {
                            name: 'rbs',
                            prefix: 'ebIcon'
                        }};
                    });
                } else {
                    items.push(RADIO_NODE);
                }
                this.nodeTypeSelect.dropDown.setItems(items);
            }.bind(this));
        }
    });
});
