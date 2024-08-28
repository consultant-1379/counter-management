define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    './Constants',
], function(core, dictionary, Constants) {
    'use strict';

    var view;

    return core.Widget.extend({
        onViewReady: function() {
            view = this.options.view;
        },

        createFlexCounter: {
            type: Constants.actionButton.type,
            color: Constants.actionButton.darkBlue,
            name: dictionary.actionButtons.create,
            action: function() { view.switchToFlexCounterConfiguration(); }
        },

        saveFlexCounter: {
            type: Constants.actionButton.type,
            color: Constants.actionButton.darkBlue,
            name: dictionary.actionButtons.save,
            action: function() { view.switchToFlexCountersList(); } // temporary
        },

        cancel: {
            type: Constants.actionButton.type,
            name: dictionary.actionButtons.cancel,
            action: function() { view.switchToFlexCountersList(); }
        }

    });

});
