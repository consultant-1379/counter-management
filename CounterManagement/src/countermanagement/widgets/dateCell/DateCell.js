define([
    'tablelib/Cell',
    './DateCellView',
    'i18n/AdvancedDateTime'
], function(Cell, View, advDateTime) {

    return Cell.extend({
        View: View,

        setValue: function(timestamp) {
            this.view.getDateCell().setText(this.createDateObject(timestamp));
        },

        createDateObject: function(Modified) {
            if (Modified === undefined ||Modified === null) {
                return '';
            }
            else {
                return advDateTime(new Date(
                    parseInt(Modified.slice(0,4)), //year
                    parseInt(Modified.slice(4,6))-1, //month, JS takes date 0-11, openidm saves date 1-12
                    parseInt(Modified.slice(6,8)), //day
                    parseInt(Modified.slice(8,10)), //hour
                    parseInt(Modified.slice(10,12)), //minute
                    parseInt(Modified.slice(12,14)) //seconds
                )).format('DTS');
            }
        }

    });
});
