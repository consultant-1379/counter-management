define([
    'jscore/core',
    './ViewContainerView',
    'jscore/ext/locationController',
    'i18n!countermanagement/dictionary.json',
    '../../utils/Constants',
    '../../utils/ActionButtons',
    '../flexCountersList/FlexCountersList',
    '../flexCounterConfiguration/FlexCounterConfiguration',
], function(core, View, LocationController, dictionary, Constants, ActionButtons,
    FlexCountersList, FlexCounterConfiguration) {
    'use strict';

    var app, self;

    return core.Widget.extend({

        View: View,

        onViewReady: function() {
            app = this.app = this.options.app;
            self = this;
            this.context = this.options.context;
            this.currentView = null;
            this.actionButtons = new ActionButtons({view: this});
            this.flexCountersList = new FlexCountersList({context: this.context});
            this.flexCounterConfiguration = new FlexCounterConfiguration();

            this.locationController = new LocationController({
                autoUrlDecode: true,
                namespace: this.options.namespace
            });
            this.locationController.addLocationListener(this.checkLocation.bind(this));
            this.locationController.start();
        },

        checkLocation: function() {
            var locationArr = this.locationController.getLocation().split('/');
            if (locationArr.length > 1) {
                if (locationArr[1] === this.flexCounterConfiguration.name) {
                    this.switchToFlexCounterConfiguration();
                } else {
                    this.switchToFlexCountersList();
                }
            }
            else {
                this.switchToFlexCountersList();
            }
        },

        changeView: function(view, setPath) {
            if (this.currentView) {
                this.currentView.detach();
            }
            view.attachTo(this.getElement());
            this.currentView = view;
            this.locationController.setLocation(this.options.namespace + (setPath ? '/' + view.name : ''));
        },

        switchToFlexCountersList: function() {
            this.changeView(this.flexCountersList);
            this.showDetailsRegion();
            app.sendLayoutEvent(
                Constants.event.topsection.defaultactions,
                [self.actionButtons.createFlexCounter]
            );
            app.topSection.setTitle(app.options.properties.title);
            app.topSection.setBreadcrumb(app.options.breadcrumb);
        },

        switchToFlexCounterConfiguration: function() {
            this.changeView(this.flexCounterConfiguration, true);
            this.hideDetailsRegion();
            app.sendLayoutEvent(
                Constants.event.topsection.defaultactions,
                [self.actionButtons.saveFlexCounter, self.actionButtons.cancel]
            );
            app.topSection.setTitle(dictionary.view.flexCounterConfiguration.name);
            app.topSection.setBreadcrumb(app.options.breadcrumb.concat({
                name: dictionary.view.flexCounterConfiguration.name
            }));
        },

        showDetailsRegion: function() {
            if (app.slidingPanel) {
                app.getElement().find('.elLayouts-QuickActionBar-rightSeparator').setStyle('visibility', 'visible');
                app.getElement().find('.elLayouts-PanelActionBar-button_details').setStyle('visibility', 'visible');
            }
        },

        hideDetailsRegion: function() {
            if (app.slidingPanel) {
                app.sendLayoutEvent('layouts:closerightpanel');
                app.getElement().find('.elLayouts-QuickActionBar-rightSeparator').setStyle('visibility', 'hidden');
                app.getElement().find('.elLayouts-PanelActionBar-button_details').setStyle('visibility', 'hidden');

            }
        }
    });
});
