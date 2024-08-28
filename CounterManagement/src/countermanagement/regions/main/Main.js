define([
    'jscore/core',
    './MainView',
    'container/api',
    'i18n!countermanagement/dictionary.json',
    '../../utils/Rest',
    '../../utils/Export',
    '../../utils/Constants',
    '../../utils/ErrorHandling',
    '../../widgets/viewContainer/ViewContainer'
], function(core, View, Container, dictionary, Rest, Export, Constants, ErrorHandling, ViewContainer) {
    'use strict';

    var app;
    return core.Region.extend({
        View: View,

        onStart: function() {
            app = this.options.app;
            this.viewContainer = new ViewContainer({
                context: this.getContext(),
                namespace: this.options.namespace,
                app: app
            });
            this.viewContainer.attachTo(this.getElement());

            Rest.getFlexCountersList().
                then(
                    function(data) {
                        this.hideLoader();
                        this.viewContainer.flexCountersList.createCountersList({data: data});
                        this.viewContainer.flexCountersList.counterTable.addEventHandler('counterSelected', function(selectedCounter) {
                            this.onCounterSelection(selectedCounter);
                        }.bind(this)
                        );
                    }.bind(this)
                )
                .catch(
                    function(error) {
                        this.hideLoader();
                        ErrorHandling.handle(error, this.viewContainer.flexCountersList.getElement());
                    }.bind(this)
                );
        },

        onCounterSelection: function(selectedCounterName) {
            if (!app.detailsRegion.isRunning())
            {
                app.detailsRegion.start();
            }
            app.sendLayoutEvent('onCounterSelection', selectedCounterName);
        },

        onStop: function() {},

        showLoader: function() {
            Container.getEventBus().publish('container:loader');
        },

        hideLoader: function() {
            Container.getEventBus().publish('container:loader-hide');
        }

    });
});
