define([
    'jscore/core',
    'text!./_details.html',
    'styles!./_details.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        },

        getContentArea: function() {
            return this.getElement().find('.eaCounterManagement-rDetails-contentArea');
        },

        getMessageArea: function() {
            return this.getElement().find('.eaCounterManagement-rDetails-messageArea');
        },

        toggleContentArea: function() {
            this.getMessageArea().setStyle('display', 'none');
            this.getContentArea().setStyle('display', 'block');
        },

        toggleMessageArea: function() {
            this.getContentArea().setStyle('display', 'none');
            this.getMessageArea().setStyle('display', 'block');
        }
    });

});
