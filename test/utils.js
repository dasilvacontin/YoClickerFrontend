
var utils = require('../utils.js');
var should = require('should');

describe('utils', function () {

	describe('requestJSON', function () {
		it('should have tests');
	});

	describe('fromRequestGetJSON', function () {

		it('should pass the error to the callback', function () {
			var e = new Error();
			var ecb = null;
			utils.fromRequestGetJSON(
				e,
				undefined,
				undefined,
				function (err, res, json) {
					ecb = e;
				}
			);
			e.should.equal(ecb);
		});

		it('should generate an error from response != 200', function () {
			var e = undefined;
			utils.fromRequestGetJSON(
				undefined,
				{statusCode: 400},
				undefined,
				function (err, res, json) {
					e = err;
				}
			);
			e.should.not.equal(undefined);
		});

	});

	describe('getBody', function () {
		it('should have tests');
	});

});