define([
    'jscore/core',
    'text!./_flexCountersList.html',
    'styles!./_flexCountersList.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        }
    });

});
