define([
    'jscore/core',
    './NodeTypeSelectView',
    'widgets/SelectBox',
    'i18n!countermanagement/dictionary.json'
], function(core, View, SelectBox, dictionary) {
    'use strict';

    return core.Widget.extend({

        view: function() {
            return new View({
                nodeTypeSelect: dictionary.nodeTypeSelect
            });
        },

        onViewReady: function(options) {
            this.dropDown = new SelectBox(
                {
                    value: options.data.value,
                    items: options.data.items,
                    modifiers: [{name: 'width', value: 'full'}]
                }
            );
            this.dropDown.attachTo(this.view.getNodeTypeSelect());
        }
    });
});
