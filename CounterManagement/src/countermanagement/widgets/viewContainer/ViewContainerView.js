define([
    'jscore/core',
    'text!./_viewContainer.html',
    'styles!./_viewContainer.less'
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
