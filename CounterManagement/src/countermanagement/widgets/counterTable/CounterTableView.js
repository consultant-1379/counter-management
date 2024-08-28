define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    'template!./_counterTable.html',
    'styles!./_counterTable.less'
], function(core, dictionary, template,style) {

    return core.View.extend({

        getTemplate: function() {
            return template(dictionary);
        },

        getStyle: function() {
            return style;
        },

        getTableContainer: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-contentHolder-table');
        },

        getTableBody: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-contentHolder-tableBody');
        },

        getTableHeaderRight: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-contentHolder-tableHeader-right');
        },

        showTableHeaderRight: function() {
            this.getTableHeaderRight().removeModifier('hide');
        },

        hideTableHeaderRight: function() {
            this.getTableHeaderRight().setModifier('hide');
        },

        showTableContainer: function() {
            this.getTableContainer().removeModifier('hide');
        },

        hideTableContainer: function() {
            this.getTableContainer().setModifier('hide');
        },

        getErrorContainer: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-errorContainer');
        },

        showErrorContainer: function() {
            this.getErrorContainer().removeModifier('hide');
        },

        hideErrorContainer: function() {
            this.getErrorContainer().setModifier('hide');
        },

        getListCount: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-count');
        },

        getTableWrapper: function() {
            return this.getElement().find('.elTablelib-Table-wrapper');
        },

        setScrollPosition: function(scrollPosition) {
            if (this.getTableWrapper()) {
                this.getTableWrapper().getNative().scrollLeft = scrollPosition[0];
                this.getTableWrapper().getNative().scrollTop = scrollPosition[1];
            }
        },

        getFilterClear: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-filter');
        },

        hideFilterClear: function() {
            this.getFilterClear().setStyle('display','none');
        },

        showFilterClear: function() {
            this.getFilterClear().setStyle('display','inline-block');
        },

        hideSelectClear: function() {
            this.getSelectClear().setStyle('display','none');
        },

        showSelectClear: function() {
            this.getSelectClear().setStyle('display','inline-block');
        },

        getSelectCount: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-select-count');
        },

        setSelectCount: function(count) {
            this.getSelectCount().setText(dictionary.counterTable.selected + ' ' + count);
        },

        getSelectClear: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-select-clear');
        },

        getFilterInput: function() {
            return this.getElement().find('.eaCounterManagement-counterTable-filter-input');
        },

        setFilterInput: function(value) {
            this.getElement().find('.eaCounterManagement-counterTable-filter-input').setValue(value);

        },

        /**
         * Sets the height of the table based on the window size.
         *
         * @method setTableHeight
         * @param rows
         */
        setTableHeight: function(rows) {

            var tableHeight;
            var messageHeight = 0;
            var fixedHeaderHeight = 66;

            if (this.modelInStorage) {
                messageHeight = 90;
            }
            // If less than 15 rows in table, show number of rows.
            if (rows.length <= 15) {
                this.getTableWrapper().setStyle('height', ((((rows.length) * 32) + 4) - messageHeight) - fixedHeaderHeight + 'px');
            }
            // If window size is less than 650, set table to 12 rows high
            else if ((window.innerHeight) < 650) {
                this.getTableWrapper().setStyle('height', ((12.5*(32)) + 4 - messageHeight) - fixedHeaderHeight + 'px');
            }
            else {
                tableHeight = ((Math.floor((window.innerHeight - 192) / 32))*32);
                this.getTableWrapper().setStyle('height', ((tableHeight - messageHeight - fixedHeaderHeight) + 'px'));
            }

            if ((((rows.length)*32)+4) < window.innerHeight) {
                tableHeight = ((Math.floor((window.innerHeight - 192) / 32)) * 32);
                this.getTableWrapper().setStyle('height', ((tableHeight  - messageHeight - fixedHeaderHeight) + 'px'));
            }
        }
    });
});

