define([
    'countermanagement/utils/Utility',
    'i18n/AdvancedDateTime'
], function(Utility, AdvancedDateTime) {
    describe('Utility', function() {
        var classUnderTest,
            sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('formatDateAttributes()', function() {

            var dateTime = '2019-06-07 15:23:33';

            it('Should format date correctly for valid value in milliseconds', function() {
                var dateInMilliSeconds = 1559917413241;
                expect(Utility.formatDateAttributes(dateInMilliSeconds)).to.eql(dateTime);
            });

            it('Should format date correctly for valid value in TimeStamp string format', function() {
                var dateString = 'June 07, 2019 15:23:33';
                expect(Utility.formatDateAttributes(dateString)).to.eql(dateTime);
            });

            it('Should not format null value', function() {
                var dateInput = null;
                expect(Utility.formatDateAttributes(dateInput)).to.eql(dateInput);
            });

            it('Should not format empty value', function() {
                var dateInput = '';
                expect(Utility.formatDateAttributes(dateInput)).to.eql(dateInput);
            });
        });
    });
});
