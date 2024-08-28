define([
    'jscore/core',
    'text!./_flexCounterConfiguration.html',
    'styles!./_flexCounterConfiguration.less'
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
