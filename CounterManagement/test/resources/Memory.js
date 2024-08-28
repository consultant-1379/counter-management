if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
var FlexCounterDB = require('./FlexCounters');
define(function() {

    return function() {
        var data = FlexCounterDB.flexCountersData;

        return {
            getAll: function() {
                var arr =[];
                Object.keys(data).forEach(function(key) {
                    arr.push(data[key]);
                });
                return arr;
            },

            getFlexCounter: function(name) {
                return data[name];
            },

            remove: function(name) {
                delete data[name];
            },

            save: function(flexCounter) {
                if (data[flexCounter.flexCounterName] === undefined) {
                    data[flexCounter.flexCounterName] = flexCounter;
                }

            },

            setData: function(flexCounterData) {
                data = flexCounterData;
            },

            clear: function() {
                data = {};
            }
        };
    };
});
