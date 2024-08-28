define([
    '../../utils/net'
], function(net) {
    return {
        getRadioNodes: function() {
            // return new Promise.resolve(['RadioNode']);
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve(['RadioNode']);
                }, 100);
            });
        },

        getFlexFilterGroups: function() {
            return net.ajax({
                url: '/counter-management/flexGroups',
                type: 'GET',
                dataType: 'json'
            }).then(function(response) {
                return response.data;
            });
        },

        getBaseCounters: function() {
            return net.ajax({
                url: '/counter-management/baseCounters',
                type: 'GET',
                dataType: 'json'
            }).then(function(response) {
                return response.data;
            });
        }
    };
});

