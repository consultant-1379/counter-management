/*global  describe, sinon, before, beforeEach, afterEach, it*/
define([
    'jscore/core',
    'countermanagement/regions/flexCounterCreate/FlexCounterCreate'
], function(core, FlexCounterCreate) {
    'use strict';

    describe('regions/FilterCounterMapping', function() {

        var sandbox, app, content, classUnderTest;

        beforeEach(function() {
            // create sandbox with fake server and auto respond to requests
            sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            sandbox.server.autoRespond = true;

            // create app
            app = new core.App();
            app.start(new core.Element());

            // create div to hold the region
            content = new core.Element();
            content.setStyle({width: '100%', height: 420});
            app.getElement().append(content);

            // create region
            classUnderTest = new FlexCounterCreate({
                context: app.getContext(),
                showTopology: true
            });
            classUnderTest.start(content);

            // fake server
            this.xhr = sinon.useFakeXMLHttpRequest();
            var requests = this.requests = [];

            this.xhr.onCreate = function(xhr) {
                requests.push(xhr);
                this.requests.push(xhr);
            };
        });

        afterEach(function() {
            content.remove();
            app.stop();
            this.xhr.restore();
            sandbox.restore();
        });

        describe('onStart()', function() {
            it('Should passed the data to the drop down', function() {

                //Assemble
                sandbox.spy(classUnderTest, 'initNodeTypeSelect');
                sandbox.spy(classUnderTest, 'initFilterCounterMapping');
                classUnderTest.nodeTypeSelect = undefined;

                //Act
                classUnderTest.onStart();

                //Assert
                expect(classUnderTest.nodeTypeSelect).to.be.not.undefined;
                expect(classUnderTest.initNodeTypeSelect.callCount).to.equal(1);
                expect(classUnderTest.initFilterCounterMapping.callCount).to.equal(1);

            });
        });

        describe('onViewReady()', function() {
            it('Should call loadDropdownItems', function() {

                //Assemble
                sandbox.spy(classUnderTest, 'loadDropdownItems');

                //Act
                classUnderTest.onViewReady();

                //Assert
                expect(classUnderTest.loadDropdownItems.callCount).to.equal(1);
            });
        });

        describe('initNodeTypeSelect()', function() {
            it('Should init nodeTypeSelect with default data', function() {

                //Assemble
                var nodeTypeSelect;
                var expected = {name: 'Select Node Type', value: '', title: 'Select Node Type'};

                //Act
                nodeTypeSelect = classUnderTest.initNodeTypeSelect();

                //Assert
                expect(nodeTypeSelect).to.be.not.undefined;
                expect(nodeTypeSelect.dropDown.getValue()).to.eql(expected);
            });
        });

        describe('initFilterCounterMapping()', function() {
            it('Should destroy exist filterCounterMapping before create', function() {

                //Assemble
                var baseCounters = [
                    {
                        'baseCounterName': 'bc1',
                        'sourceObject': 's1',
                        'basedOnEvent': [
                            'ev1'
                        ]
                    },
                    {
                        'baseCounterName': 'bc2',
                        'sourceObject': 's1',
                        'basedOnEvent': [
                            'ev1',
                            'ev2'
                        ]
                    }
                ];
                var flexFilters =  [
                    {
                        flexGroupName: 'Flex Group 1',
                        flexGroupId: 'fg1'
                    },
                    {
                        flexGroupName: 'Flex Group 2',
                        flexGroupId: 'fg2'
                    }
                ];
                classUnderTest.baseCounters = baseCounters;
                classUnderTest.flexGroups = flexFilters;
                classUnderTest.filterCounterMapping = {
                    destroy: function() {},
                    baseCounters: [],
                    flexFilters: []
                };
                sandbox.stub(classUnderTest.filterCounterMapping, 'destroy');

                //Act
                classUnderTest.initFilterCounterMapping();

                //Assert
                expect(classUnderTest.filterCounterMapping.baseCounters).to.eql(baseCounters);
                expect(classUnderTest.filterCounterMapping.flexFilters).to.eql(flexFilters);
            });
        });
    });

});
