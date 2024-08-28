define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    './CounterDetailsView',
    '../../utils/Utility'
], function(core, dictionary, View, Utility) {

    return core.Widget.extend({

        init: function(options) {
            this.options = options;

        },

        view: function() {
            this.options.counterDetails= [];
            this.createAttributePairs(this.options.data);
            return new View(this.options);
        },

        createAttributePairs: function(counterDetailsData) {
            var _this = this;
            Object.keys(counterDetailsData)
                .forEach(function eachKey(attributeName) {
                    var counterItem = {};
                    counterItem.attributeName = dictionary.counterDetails[attributeName];
                    if (counterDetailsData[attributeName]) {
                        if (typeof counterDetailsData[attributeName] === 'object') {
                            _this.createAttributePairs(counterDetailsData[attributeName]);
                        } else {
                            counterItem.attributeValue = attributeName === 'modified' ? Utility.formatDateAttributes(counterDetailsData[attributeName]) : counterDetailsData[attributeName];
                        }
                        if (counterItem.attributeName) {
                            _this.options.counterDetails.push(counterItem);
                        }
                    }
                });
        }
    });
});
