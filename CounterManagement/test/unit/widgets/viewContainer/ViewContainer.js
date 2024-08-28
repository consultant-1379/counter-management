define([
    'jscore/core',
    'countermanagement/widgets/viewContainer/ViewContainer'
], function(core, ViewContainer) {
    'use strict';

    describe('ViewContainer', function() {

        var viewContainer,
            sandbox;

        before(function() {
            sandbox = sinon.sandbox.create();
        });

        beforeEach(function() {
            viewContainer = new ViewContainer({
                app: {
                    options: {
                        properties: {},
                        breadcrumb: []
                    },
                    topSection: {
                        setTitle: function() {},
                        setBreadcrumb: function() {}
                    },
                    slidingPanel: null,
                    sendLayoutEvent: function() {}
                }
            });
            viewContainer.onViewReady();
            sandbox.stub(viewContainer.app.topSection, 'setTitle', function() {});
            sandbox.stub(viewContainer.app.topSection, 'setBreadcrumb', function() {});
            sandbox.stub(viewContainer.locationController, 'setLocation', function() {});
            sandbox.stub(viewContainer.app, 'sendLayoutEvent', function() {});
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should be defined', function() {
            expect(viewContainer).to.be.object;
        });

        it('should have UI SDK onViewReady method', function() {
            expect(viewContainer.onViewReady).to.be.function;
        });

        it('should have views defined', function() {
            expect(viewContainer.flexCountersList).to.be.object;
            expect(viewContainer.flexCounterConfiguration).to.be.object;
        });

        it('should have LocationController defined', function() {
            viewContainer.onViewReady();
            expect(viewContainer.locationController).to.be.object;
        });

        it('should change browser URL', function() {
            viewContainer.changeView(viewContainer.flexCounterConfiguration);
            expect(viewContainer.locationController.setLocation.callCount).to.equal(1);
        });
        
        it('should switch to "Create Flex Counter" view', function() {
            viewContainer.switchToFlexCounterConfiguration();
            expect(viewContainer.app.sendLayoutEvent.callCount).to.equal(1);
            expect(viewContainer.locationController.setLocation.callCount).to.equal(1);
            expect(viewContainer.app.topSection.setTitle.callCount).to.equal(1);
            expect(viewContainer.app.topSection.setBreadcrumb.callCount).to.equal(1);
        });
        
        it('should switch to "Flex Counters List" view', function() {
            viewContainer.switchToFlexCountersList();
            expect(viewContainer.app.sendLayoutEvent.callCount).to.equal(1);
            expect(viewContainer.locationController.setLocation.callCount).to.equal(1);
            expect(viewContainer.app.topSection.setTitle.callCount).to.equal(1);
            expect(viewContainer.app.topSection.setBreadcrumb.callCount).to.equal(1);
        });

    });
});
