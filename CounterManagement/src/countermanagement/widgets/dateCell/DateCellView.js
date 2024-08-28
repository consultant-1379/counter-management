/*global define*/
define([
    'jscore/core',
    'template!./_dateCell.html',
    'styles!./_dateCell.less'
], function(core, template,style) {


    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },
        //
        getStyle: function() {
            return style;
        },

        getDateCell: function() {
            return this.getElement().find('.eaCounterManagement-dateCell-text');
        }
    });
});
