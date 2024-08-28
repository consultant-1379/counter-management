define([
    'jscore/ext/mvp'
], function(mvp) {

    return mvp.Model.extend({

        tableLayout: {
            attributes: {
                tableColumns: {
                    counterName: {width: '500px', visible: 'true', sortMode: ''},
                    status: {width: '150px', visible: 'true', sortMode: ''},
                    moClass: {width: '200px', visible: 'true', sortMode: ''},
                    createdBy: {width: '200px', visible: 'true', sortMode: ''},
                    modifiedDate: {width: '200px', visible: 'true', sortMode: ''}
                }
            }
        },

        initializeTableLayout: function() {
            return this.tableLayout;
        },

        getColumnWidth: function() {
            return this.getAttribute('tableColumns');
        },

        setColumnWidth: function(columnName, width) {
            for (var column in this.attributes.tableColumns) {
                this.attributes.tableColumns[column].width = width;
            }
        },

        removeColumnSortmode: function(columnName) {
            for (var column in this.attributes.tableColumns) {
                if (column !== columnName) {
                    this.attributes.tableColumns[column].sortMode = '';
                }
            }
        },

        setColumnSort: function(columnName, sortMode) {
            for (var column in this.attributes.tableColumns) {
                if (column === columnName) {
                    this.removeColumnSortmode(columnName);
                    this.attributes.tableColumns[column].sortMode = sortMode;
                    break;
                } else {
                    this.attributes.tableColumns[column].sortMode = '';
                }
            }
        }
    });
});
