define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    'layouts/TopSection',
    'layouts/MultiSlidingPanels',
    './regions/main/Main',
    './regions/details/Details'
], function(core, dictionary, TopSection, MultiSlidingPanels, Main, Details) {
    'use strict';

    return core.App.extend({
        detailsRegionExpanded: false,

        onStart: function() {
            this.topSection = new TopSection({
                breadcrumb: this.options.breadcrumb,
                title: this.options.properties.title,
                context: this.getContext(),
                defaultActions: []
            });

            this.mainController = new Main({
                context: this.getContext(),
                namespace: this.options.namespace,
                app: this
            });
            this.detailsRegion = new Details({
                context: this.getContext(),
                namespace: this.options.namespace,
                app: this
            });

            this.slidingPanel = new MultiSlidingPanels({
                context: this.getContext(),
                resizeable: true,
                rightWidth: 350,
                rightMinWidth: 350,
                main: {
                    content: this.mainController
                },
                right: [
                    {
                        label: dictionary.details.name,
                        value: dictionary.details.value,
                        icon: 'info',
                        content: this.detailsRegion,
                        expanded: this.detailsRegionExpanded,
                        primary: true
                    }
                ]
            });

            this.topSection.setContent(this.slidingPanel);
            this.topSection.attachTo(this.getElement());
            this.addListeners();
        },

        sendLayoutEvent: function(eventName, content) {
            this.getEventBus().publish(eventName, content);
        },

        addListeners: function() {
            this.getEventBus().subscribe('layouts:rightpanel:beforechange', this.onRightPanelChange,this);
        },



        onRightPanelChange: function(isShown, value) {
            if (isShown) {
                this.sendLayoutEvent('onDetailsPanel:open');
            }
        },

        onPause: function() {

        },

        onResume: function() {

        },

        onBeforeLeave: function() {

        }
    });
});
