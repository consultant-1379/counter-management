define([
    'jscore/core',
    'text!./_filterCounterMapping.html',
    'styles!./_filterCounterMapping.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        },

        getFlexFilter: function() {
            return this.getElement().find('.eaCounterManagement-wFilterCounterMapping-flexFilter');
        },

        getBaseCounter: function() {
            return this.getElement().find('.eaCounterManagement-wFilterCounterMapping-baseCounter');
        }
    });

});
