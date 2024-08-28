/*global  describe, sinon, before, beforeEach, afterEach, it*/
define([
    'jscore/core',
    'countermanagement/regions/flexCounterCreate/Rest',
    'jscore/ext/net'
], function(core, Rest, net) {
    'use strict';

    describe('regions/Rest', function() {

        var sandbox,
            classUnderTest;

        before(function() {
            sandbox = sinon.sandbox.create();
            classUnderTest = Rest;
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('get flex filter groups', function() {
            it('should make right ajax request',function() {
                //SETUP
                sandbox.stub(net, 'ajax').returns(Promise.resolve());

                //ACT
                classUnderTest.getFlexFilterGroups();
                //ASSERT
                expect(net.ajax.callCount).to.equal(1);
                expect(net.ajax.getCall(0).calledWithMatch({
                    url: '/counter-management/flexGroups',
                    type: 'GET',
                    dataType: 'json'
                })).to.equal(true);
            });
        });

        describe('get base counters', function() {
            it('should make right ajax request',function() {
                //SETUP
                sandbox.stub(net, 'ajax').returns(Promise.resolve());

                //ACT
                classUnderTest.getBaseCounters();
                //ASSERT
                expect(net.ajax.callCount).to.equal(1);
                expect(net.ajax.getCall(0).calledWithMatch({
                    url: '/counter-management/baseCounters',
                    type: 'GET',
                    dataType: 'json'
                })).to.equal(true);
            });
        });

    });

});

