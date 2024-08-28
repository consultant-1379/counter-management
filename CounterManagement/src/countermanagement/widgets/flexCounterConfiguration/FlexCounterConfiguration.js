define([
    'jscore/core',
    './FlexCounterConfigurationView',
    '../../utils/Constants',
    '../../regions/flexCounterCreate/FlexCounterCreate'
], function(core, View, Constants, FlexCounterCreate) {
    'use strict';

    return core.Widget.extend({

        name: Constants.view.flexCounterConfiguration, // Name used for URL navigation

        View: View,

        onViewReady: function() {

            var flexCounterCreate = new FlexCounterCreate({

            });
            flexCounterCreate.start(this.getElement());

        },

        onDestroy: function() {

        }

    });

});
