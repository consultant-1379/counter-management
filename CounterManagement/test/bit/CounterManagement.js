/*global define, describe, before, after, beforeEach, afterEach, it, expect */
define([
    'countermanagement/CounterManagement'
], function(CounterManagement) {
    'use strict';

    describe('CounterManagement', function() {

        it('Sample BIT test', function() {
            expect(CounterManagement).not.to.be.undefined;
        });

    });

});
