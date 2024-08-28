define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    '../dateCell/DateCell'
], function(core, dictionary, DateCell) {
    'use strict';
    return core.Widget.extend({

        init: function(options) {
            this.options = options;
            if (this.options) {
                this.tableLayout = this.options.tableLayout;
            }
        },

        getOrderedColumns: function() {
            var orderedColumn = Object.keys(this.tableLayout.attributes.tableColumns);
            var columns = [];
            for (var i = 0; i < orderedColumn.length; i++) {
                if (orderedColumn[i] === 'counterName') {
                    columns.push({
                        attribute: 'counterName',
                        title: dictionary.counterTable.tableColumns.counterName,
                        sortable: true,
                        width: this.tableLayout.attributes.tableColumns.counterName ? this.tableLayout.attributes.tableColumns.counterName.width : '230px',
                        resizable: true,
                        visible: true,
                        type: 'STRING',
                        disableVisible: true
                    });
                }
                else if (orderedColumn[i] === 'moClass') {
                    columns.push({
                        attribute: 'moClass',
                        title: dictionary.counterTable.tableColumns.moClass,
                        sortable: true,
                        width: this.tableLayout.attributes.tableColumns.moClass ? this.tableLayout.attributes.tableColumns.moClass.width : '230px',
                        resizable: true,
                        visible: true,
                        type: 'STRING',
                        disableVisible: true
                    });
                }
                else if (orderedColumn[i] === 'status') {
                    columns.push({
                        attribute: 'status',
                        title: dictionary.counterTable.tableColumns.status,
                        sortable: true,
                        width: this.tableLayout.attributes.tableColumns.status ? this.tableLayout.attributes.tableColumns.status.width : '230px',
                        resizable: true,
                        visible: true,
                        type: 'STRING',
                        disableVisible: true
                    });
                }
                else if (orderedColumn[i] === 'filter') {
                    columns.push({
                        attribute: 'filter',
                        title: dictionary.counterTable.tableColumns.filter,
                        sortable: true,
                        width: this.tableLayout.attributes.tableColumns.filter ? this.tableLayout.attributes.tableColumns.filter.width : '230px',
                        resizable: true,
                        visible: this.tableLayout.attributes.tableColumns.filter.visible ? this.tableLayout.attributes.tableColumns.filter.visible : false,
                        type: 'STRING'
                    });
                }
                else if (orderedColumn[i] === 'createdBy') {
                    columns.push({
                        attribute: 'createdBy',
                        title: dictionary.counterTable.tableColumns.createdBy,
                        sortable: true,
                        width: this.tableLayout.attributes.tableColumns.createdBy ? this.tableLayout.attributes.tableColumns.createdBy.width : '230px',

                        resizable: true,
                        visible: this.tableLayout.attributes.tableColumns.createdBy.visible ? this.tableLayout.attributes.tableColumns.createdBy.visible : false,
                        type: 'STRING'
                    });
                }
                else if (orderedColumn[i] === 'modifiedDate') {
                    columns.push({
                        attribute: 'modifiedDate',
                        title: dictionary.counterTable.tableColumns.modifiedDate,
                        sortable: true,
                        cellType: DateCell,
                        width: this.tableLayout.attributes.tableColumns.modifiedDate ? this.tableLayout.attributes.tableColumns.modifiedDate.width : '230px',
                        resizable: true,
                        visible: this.tableLayout.attributes.tableColumns.modifiedDate.visible ? this.tableLayout.attributes.tableColumns.modifiedDate.visible : false,
                        type: 'Date'
                    });
                }
            }
            return {columns: columns};
        }
    });
});
