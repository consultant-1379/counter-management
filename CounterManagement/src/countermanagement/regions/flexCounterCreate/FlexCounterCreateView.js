define([
    'jscore/core',
    'text!./_flexCounterCreate.html',
    'styles!./_flexCounterCreate.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        },

        getNodeTypeSelect: function() {
            return this.getElement().find('.eaCounterManagement-rFlexCounterCreate-nodeTypeSelect');
        },

        getFilterCounterMapping: function() {
            return this.getElement().find('.eaCounterManagement-rFlexCounterCreate-filterCounterMapping');
        }
    });

});
