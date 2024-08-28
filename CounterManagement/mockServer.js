var flexGroupsData = require('./test/resources/FlexFilterGroups');
var baseCountersData = require('./test/resources/BaseCounters');
var FlexDB = require('./test/resources/Memory');

module.exports = function(app) {

    var flexDb = new FlexDB();
    var blockResponses;

    //Block all respomses
    app.get('/test/counter-management-mock/block/:errCode', function(req, res) {
        blockResponses = req.params.errCode;
        res.status(200).send(JSON.stringify('Set: ' + req.params.errCode));
    });

    //Unblock all respomses
    app.get('/test/counter-management-mock/unblock', function(req, res) {
        blockResponses = false;
        res.status(200).send(JSON.stringify('OK'));
    });
    
    //Clear customTopologyDB
    app.get('/test/counter-management-db/clear', function(req, res) {
        flexDb.clear();
        res.status(200).send(JSON.stringify('OK'));
    });

    // Set customTopologyDB
    app.get('/test/counter-management-db/set', function(req, res) {
        flexDb.setData(req.body);
        res.status(200).send(JSON.stringify('OK'));
    });

    // get flex groups
    app.get('/counter-management/flexGroups', function(req, res) {
        if (blockResponses) {
            res.status(blockResponses).send();
            return;
        }
        setTimeout(function() {
            res.status(200).send(flexGroupsData);
        }, 100);
    });

    // get base groups
    app.get('/counter-management/baseCounters', function(req, res) {
        if (blockResponses) {
            res.status(blockResponses).send();
            return;
        }
        setTimeout(function() {
            res.status(200).send(baseCountersData.baseCounters);
        }, 100);
    });

    // get flex counters
    app.get('/counter-management/flexCounters', function(req, res) {
        if (blockResponses) {
            res.status(blockResponses).send(blockResponses === '400' ? JSON.stringify({errorCode: -999}) : '');
            return;
        }
        setTimeout(function() {
            res.status(200).send(flexDb.getAll());
        }, 200);
    });

    // add flex counters
    app.post('/counter-management/flexCounters', function(req, res) {
        if (blockResponses) {
            res.status(blockResponses).send();
            return;
        }
        res.status(200).send(flexDb.save(req.body));
    });

    // delete flex counters
    app.post('/counter-management/flexCounters/:name', function(req, res) {
        if (blockResponses) {
            res.status(blockResponses).send();
            return;
        }
        res.status(200).send(flexDb.delete(req.params.name));
    });

    // get flex counter for given name
    app.get('/counter-management/flexCounters/:name', function(req, res) {
        if (blockResponses) {
            res.status(blockResponses).send();
            return;
        }
        setTimeout(function() {
            res.status(200).send(flexDb.getFlexCounter(req.params.name));
        }, 500);
    });

};
