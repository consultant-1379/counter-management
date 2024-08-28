define([
    'jscore/core',
    'countermanagement/regions/main/Main'
], function(core, MainController) {
    'use strict';

    describe('MainCotroller', function() {

        var mainController,
            sandbox;

        before(function() {
            sandbox = sinon.sandbox.create();
        });

        beforeEach(function() {
            mainController = new MainController({
                app: {
                    options: {properties: {}},
                    topSection: {
                        setTitle: function() {},
                        setBreadcrumb: function() {}
                    },
                    sendLayoutEvent: function() {}
                }
            });
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should be defined', function() {
            expect(mainController).to.be.object;
        });

        it('should have UI SDK onStart method', function() {
            expect(mainController.onStart).to.be.function;
        });

        it('should have viewContainer component', function() {
            mainController.onStart();
            expect(mainController.viewContainer).to.be.object;
        });

    });
});
