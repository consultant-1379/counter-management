define([
    './net'
], function(net) {

    /*
     * @returns {Object}
     *  {String|Object} data - response from the request
     *  {jscore/core/XHR} xhr - Custom XmlHttpRequest
     *  {Object} - config - configuration object (ex: to identify the request)
     */
    return {
        getFlexCounterDetails: function(flexCounterName) {
            return net.ajax({
                url: '/counter-management/flexCounters/' + flexCounterName,
                type: 'GET',
                dataType: 'json'
            }).then(function(response) {
                return response.data;
            });
        },

        getFlexCountersList: function() {
            return net.ajax({
                url: '/counter-management/flexCounters',
                type: 'GET',
                dataType: 'json'
            }).then(function(response) {
                return response.data;
            });
        }
    };
});
