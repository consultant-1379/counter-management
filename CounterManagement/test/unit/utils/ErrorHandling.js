define([
    'i18n!countermanagement/dictionary.json',
    'countermanagement/utils/ErrorHandling'
], function(dictionary, ErrorHandling) {
    describe('ErrorHandling', function() {

        afterEach(function() {
            ErrorHandling.errorWindow.destroy();
        });

        describe('handle()', function() {
            it('Should return error popup message', function() {
                var errorWindow = ErrorHandling.handle({
                    xhr: {getStatus: function() { return 400; }}
                });
                expect(errorWindow).to.be.object;
                expect(errorWindow.destroy).to.be.function;
            });

            it('Should return -999 error message', function() {
                ErrorHandling.handle({
                    data: {errorCode: -999},
                    xhr: {getStatus: function() { return 400; }}
                });
                expect(ErrorHandling.errorWindow.options.content).to.equal(dictionary.errors.internal['-999'].description);
            });

            it('Should return 400 error message', function() {
                ErrorHandling.handle({
                    xhr: {getStatus: function() { return 400; }}
                });
                expect(ErrorHandling.errorWindow.options.content).to.equal(dictionary.errors.generic['400'].description);
            });

            it('Should return 403 error message', function() {
                ErrorHandling.handle({
                    xhr: {getStatus: function() { return 403; }}
                });
                expect(ErrorHandling.errorWindow.options.content).to.equal(dictionary.errors.generic['403'].description);
            });

            it('Should return 404 error message', function() {
                ErrorHandling.handle({
                    xhr: {getStatus: function() { return 404; }}
                });
                expect(ErrorHandling.errorWindow.options.content).to.equal(dictionary.errors.generic['404'].description);
            });

            it('Should return 500 error message', function() {
                ErrorHandling.handle({
                    xhr: {getStatus: function() { return 500; }}
                });
                expect(ErrorHandling.errorWindow.options.content).to.equal(dictionary.errors.generic['500'].description);
            });

            it('Should return unknown error message', function() {
                ErrorHandling.handle({
                    xhr: {getStatus: function() { return 0; }}
                });
                expect(ErrorHandling.errorWindow.options.content).to.equal(dictionary.errors.generic['unknown'].description);
            });
        });
    });
});
