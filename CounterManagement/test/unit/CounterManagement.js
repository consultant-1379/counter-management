define([
    'jscore/core',
    'countermanagement/CounterManagement'
], function(core, CounterManagement) {
    'use strict';

    describe('CounterManagement', function() {

        var counterManagement,
            eventBusStub,
            mockContext,
            sandbox;

        before(function() {
            sandbox = sinon.sandbox.create();
            eventBusStub = {
                subscribe: function() {},
                publish: function() {}
            };
        });

        beforeEach(function() {
            counterManagement = new CounterManagement();
            mockContext = new core.AppContext({title: 'test'});
            mockContext.eventBus = eventBusStub;
            counterManagement.getContext = function() {
                return mockContext;
            };
            sandbox.stub(counterManagement, 'getEventBus', function() {
                return eventBusStub;
            });
            counterManagement.options = {properties: {}};
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should be defined', function() {
            expect(counterManagement).to.be.object;
        });

        it('should have UI SDK onStart method', function() {
            expect(counterManagement.onStart).to.be.function;
        });

        it('should have common components', function() {
            counterManagement.onStart();
            expect(counterManagement.topSection).to.be.object;
            expect(counterManagement.mainController).to.be.object;
            expect(counterManagement.slidingPanel).to.be.object;
        });

        it('should call EventBus once', function() {
            counterManagement.sendLayoutEvent('test');
            expect(counterManagement.getEventBus.callCount).to.equal(1);
        });

    });
});
