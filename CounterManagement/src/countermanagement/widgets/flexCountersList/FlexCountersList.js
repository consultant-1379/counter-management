define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    './FlexCountersListView',
    '../../widgets/counterTable/CounterTable'
], function(core, dictionary, View, CounterTable) {
    'use strict';

    return core.Widget.extend({

        name: 'FlexCountersList', // Name used for URL navigation

        View: View,

        onViewReady: function(options) {
            this.options = options;
        },

        createCountersList: function(options) {
            this.counterTable = new CounterTable(options);
            this.counterTable.attachTo(this.getElement());
        }
    });
});
