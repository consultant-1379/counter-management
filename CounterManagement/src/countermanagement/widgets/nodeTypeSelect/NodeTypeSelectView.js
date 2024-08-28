define([
    'jscore/core',
    'template!./_nodeTypeSelect.html',
    'styles!./_nodeTypeSelect.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return styles;
        },

        getTitle: function() {
            return this.getElement().find('.eaCounterManagement-wNodeTypeSelect-title');
        },

        getNodeTypeSelect: function() {
            return this.getElement().find('.eaCounterManagement-wNodeTypeSelect-nodeTypeSelect');
        }

    });

});
