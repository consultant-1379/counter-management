define([
    'jscore/core',
    'jscore/ext/net',
    'i18n!countermanagement/dictionary.json',
    'countermanagement/regions/details/Details',
    'countermanagement/utils/Rest',
    'widgets/Loader',
], function(core, net, dictionary, Details, Rest, Loader) {
    'use strict';

    describe('Details Region', function() {

        var detailsRegionUnderTest,
            sandbox,eventBusStub,
            mockContext ;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
            detailsRegionUnderTest = new Details({
                app: {
                    options: {properties: {}},
                    topSection: {
                        setTitle: function() {},
                        setBreadcrumb: function() {}
                    },
                    sendLayoutEvent: function() {}
                },
            });
            mockContext = new core.AppContext();
            sandbox.stub(detailsRegionUnderTest, 'getContext', function() {
                return mockContext;
            });
            eventBusStub = {
                subscribe: function() {},
                publish: function() {}
            };
            mockContext.eventBus = eventBusStub;
            sandbox.spy(eventBusStub, 'subscribe');
            sandbox.spy(eventBusStub, 'publish');

            sandbox.stub(detailsRegionUnderTest, 'getEventBus', function() {
                return eventBusStub;
            });
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('onStart', function() {
            it('Should subscribe to "onCounterSelection" event during onStart', function() {
                detailsRegionUnderTest.start();
                expect(detailsRegionUnderTest.getEventBus().subscribe.calledWith('onCounterSelection')).to.be.true;
                expect(detailsRegionUnderTest.getEventBus().subscribe.calledWith('onDetailsPanel:open')).to.be.true;
            });


        });

        describe('onViewReady', function() {
            it('Should show empty message when there is no counter selected', function() {
                detailsRegionUnderTest.onViewReady();
                expect(detailsRegionUnderTest.message).to.be.object;
            });
        });

        describe('getSelectedCounter', function() {
            it('Should get counterdetails', function() {
                var selectedFlexCounterName = 'pmFlex';
                detailsRegionUnderTest.setSelectedCounter(selectedFlexCounterName);
                expect(detailsRegionUnderTest.getSelectedCounter()).to.equal(selectedFlexCounterName);
            });
        });


        describe('setSelectedCounter', function() {
            it('Should set counterdetails when there is a counter selected', function() {
                var selectedFlexCounterName = 'pmFlex';
                detailsRegionUnderTest.setSelectedCounter(selectedFlexCounterName);
                expect(detailsRegionUnderTest.selectedCounterName).to.equal(selectedFlexCounterName);
            });
        });

        describe('onCounterSelection', function() {
            it('Should set counterdetails and getCounterDetails', function() {
                var selectedFlexCounterName = 'pmFlex';
                sandbox.stub(detailsRegionUnderTest, 'setSelectedCounter');
                sandbox.stub(detailsRegionUnderTest, 'getCounterDetails');
                detailsRegionUnderTest.onCounterSelection(selectedFlexCounterName);
                expect(detailsRegionUnderTest.setSelectedCounter.calledOnce).to.be.true;
                expect(detailsRegionUnderTest.getCounterDetails.calledOnce).to.be.true;

            });
        });

        describe('getCounterDetails', function() {

            it('Should clear the counter details when there is no counter selected', function() {
                sandbox.stub(detailsRegionUnderTest, 'clearCounterDetails');
                detailsRegionUnderTest.getCounterDetails(null);
                expect(detailsRegionUnderTest.clearCounterDetails.calledOnce).to.be.true;
            });

        });

        describe('fetchCounterDetails', function() {


            it('Should make Rest call and go to success callback', function(done) {
                var selectedFlexCounterName = 'pmFlex';
                sandbox.stub(detailsRegionUnderTest, 'showLoader');
                sandbox.stub(detailsRegionUnderTest, 'hideLoader');
                sandbox.stub(detailsRegionUnderTest, 'onFetchDetailsSuccess');

                sandbox.stub(Rest, 'getFlexCounterDetails', function() {
                    return Promise.resolve({});
                });

                detailsRegionUnderTest.fetchCounterDetails(selectedFlexCounterName);

                expect(detailsRegionUnderTest.showLoader.calledOnce).to.be.true;
                expect(Rest.getFlexCounterDetails.calledWith(selectedFlexCounterName)).to.be.true;
                setTimeout(function() {

                    expect(detailsRegionUnderTest.hideLoader.calledOnce).to.be.true;
                    expect(detailsRegionUnderTest.onFetchDetailsSuccess.calledOnce).to.be.true;
                    done();

                }, 10);
            });

            it('Should make Rest call and go to error callback when there is an error', function(done) {
                var selectedFlexCounterName = 'pmFlex';
                sandbox.stub(detailsRegionUnderTest, 'showLoader');
                sandbox.stub(detailsRegionUnderTest, 'hideLoader');
                sandbox.stub(Rest, 'getFlexCounterDetails', function() {
                    return Promise.reject({});
                });

                detailsRegionUnderTest.fetchCounterDetails(selectedFlexCounterName);

                expect(detailsRegionUnderTest.showLoader.calledOnce).to.be.true;
                expect(Rest.getFlexCounterDetails.calledWith(selectedFlexCounterName)).to.be.true;
                setTimeout(function() {
                    expect(detailsRegionUnderTest.hideLoader.calledOnce).to.be.true;
                    done();
                }, 10);
            });

        });

        describe('onFetchDetailsSuccess', function() {
            it('Should call showCounterDetails', function() {
                var response = {name: 'pmFlex'};
                sandbox.stub(detailsRegionUnderTest, 'showCounterDetails');
                detailsRegionUnderTest.onFetchDetailsSuccess(response);
                expect(detailsRegionUnderTest.showCounterDetails.calledOnce).to.be.true;
                expect(detailsRegionUnderTest.showCounterDetails.calledWith(response)).to.be.true;

            });
        });

        describe('showCounterDetails', function() {
            it('Should create CounterDetails widget', function() {
                var counterDetails = {flexCounterName: 'FlexCounter'};
                detailsRegionUnderTest.showCounterDetails(counterDetails);
                expect(detailsRegionUnderTest.counterDetails.options.data).to.eql(counterDetails);
            });

            it('Should destroy the widget if its already present and create new counterdetails wodget', function() {
                var mockCounterDetails = new core.Widget();
                detailsRegionUnderTest.counterDetails = mockCounterDetails;
                sandbox.stub(detailsRegionUnderTest.counterDetails, 'destroy');
                var newCounterDetails = {flexCounterName: 'FlexCounter2'};
                detailsRegionUnderTest.showCounterDetails(newCounterDetails);
                expect(detailsRegionUnderTest.counterDetails.options.data).to.eql(newCounterDetails);
            });
        });

        describe('hideLoader', function() {
            it('Should hide the loader', function() {
                detailsRegionUnderTest.loader = new Loader();
                detailsRegionUnderTest.hideLoader();
                expect(detailsRegionUnderTest.loader).to.equal(null);
            });
        });

        describe('showLoader', function() {

            it('Should show loader', function() {
                detailsRegionUnderTest.showLoader();
                expect(detailsRegionUnderTest.loader).to.not.equal(null);
                expect(detailsRegionUnderTest.loader).to.be.object;
            });

        });



    });
});
