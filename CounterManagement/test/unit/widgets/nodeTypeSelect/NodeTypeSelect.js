/*global  describe, sinon, before, beforeEach, afterEach, it*/
define([
    'jscore/core',
    'countermanagement/widgets/nodeTypeSelect/NodeTypeSelect'
], function(core, NodeTypeSelect) {
    'use strict';

    describe('widgets/NodeTypeSelect', function() {

        var sandbox,
            objectUnderTest;

        before(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });


        describe('onViewReady()', function() {
            it('Should passed the data to the drop down', function() {

                //Assemble
                var expectedData = {
                    value: {name: 'Select Node Type', value: '', title: 'Select Node Type'},
                    items: []
                };

                //Act
                objectUnderTest = new NodeTypeSelect({
                    data: expectedData
                });

                //Assert
                expect(objectUnderTest.dropDown).to.be.object;
                expect(objectUnderTest.dropDown.options.items).to.eql(expectedData.items);
                expect(objectUnderTest.dropDown.options.value).to.eql(expectedData.value);
            });
        });

    });

});
