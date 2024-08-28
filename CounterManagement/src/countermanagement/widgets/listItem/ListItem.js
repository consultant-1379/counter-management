define([
    'jscore/core',
    './ListItemView',
    'widgets/Tooltip'
], function(core, View, Tooltip) {
    'use strict';

    return core.Widget.extend({

        View: View,

        init: function(options) {
            this.options = options;
        },

        onViewReady: function() {
            this.toolTip = new Tooltip({
                parent: this.view.getElement(),
                contentText: this.options.label,
                modifiers: [{'size': 'small'}]
            });
            this._setLabel(this.options.label);
        },

        /**
         * Update is called by the Tree when the redraw mode is set to `Tree.redrawMode.SOFT`.
         * @param data Item's definition
         */
        update: function(data) {
            this._setLabel(data.label);
        },

        _setLabel: function(label) {
            this.view.setLabel(label);
            this.toolTip.setContentText(label);
        }
    });
});
