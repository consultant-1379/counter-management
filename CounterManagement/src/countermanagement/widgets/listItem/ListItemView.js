define([
    'jscore/core',
    'text!./_listItem.html',
    'styles!./_listItem.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        },

        getLabel: function() {
            return this.getElement().find('.eaCounterManagement-wListItem-label');
        },

        setLabel: function(label) {
            this.getLabel().setText(label);
        }

    });

});
