define([
    'jscore/core',
    'template!./_counterDetails.html',
    'styles!./_counterDetails.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return style;
        },
    });
});

