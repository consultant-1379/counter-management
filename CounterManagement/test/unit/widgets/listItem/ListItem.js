/*global  describe, sinon, before, beforeEach, afterEach, it*/
define([
    'jscore/core',
    'countermanagement/widgets/listItem/ListItem'
], function(core, ListItem) {
    'use strict';

    describe('widgets/ListItem', function() {

        var sandbox,
            objectUnderTest;

        before(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('init()', function() {
            it('Should initialize the widget', function() {

                //Assemble
                var expectedLabel = 'test-label';

                //Act
                objectUnderTest = new ListItem({
                    'label': expectedLabel
                });

                //Assert
                expect(objectUnderTest.view.getLabel().getText()).to.equal(expectedLabel);
            });
        });

        describe('onViewReady()', function() {
            it('Should add tooltip to the widget', function() {
                //Assemble
                var expectedLabel = 'test-label';
                objectUnderTest = new ListItem({
                    'label': expectedLabel
                });

                objectUnderTest.toolTip = undefined;


                //Act
                objectUnderTest.onViewReady();

                //Assert
                expect(objectUnderTest.toolTip).to.be.object;
                expect(objectUnderTest.toolTip.options.contentText).to.equal(expectedLabel);
            });
        });

        describe('update()', function() {
            it('Should call _setLabel with label', function() {
                //Assemble
                var initialLabel = 'test-label';
                var expectedLabel = 'updated-text';
                objectUnderTest = new ListItem({
                    'label': initialLabel
                });
                sandbox.spy(objectUnderTest, '_setLabel');

                //Act
                objectUnderTest.update({ label: expectedLabel});

                //Assert
                expect(objectUnderTest._setLabel.callCount).to.equal(1);
                expect(objectUnderTest._setLabel.firstCall.calledWith(expectedLabel)).to.equal(true);
            });
        });

        describe('_setLabel()', function() {
            it('Should update label of the item', function() {
                //Assemble
                var initialLabel = 'test-label';
                var expectedLabel = 'updated-text';
                objectUnderTest = new ListItem({
                    'label': initialLabel
                });

                //Act
                objectUnderTest._setLabel(expectedLabel);

                //Assert
                expect(objectUnderTest.view.getLabel().getText()).to.equal(expectedLabel);
            });
        });


    });

});
