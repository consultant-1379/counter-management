define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    './EmptyListMessageView'
], function(core, dictionary, View) {

    return core.Widget.extend({

        View: View,

        init: function(options) {
            this.options = options;

        },

        onViewReady: function(options) {
            this.options = options;
            this.view.setMessageContent();
        }
    });
});
