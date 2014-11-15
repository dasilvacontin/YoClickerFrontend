
var debug = require('debug')('YoClicker:utils');
var http = require('http');
var request = require('request');

exports.requestJSON = function (params, cb) {
	request(params, function (err, res, body) {
		if (err) {
			debug('request error');
			return cb(err, res, body);
		}
		if (res.statusCode != 200) {
			debug('statusCode != 200 -> ' + res.statusCode);
			return cb(new Error (500), res, body);
		}
		try {
			body = JSON.parse(body);
		} catch (e) {
			debug('json parse fail, backend error');
			return cb(new Error (500), res, body);
		}
		debug('success request');
		cb(err, res, body);
	});
}

exports.fromRequestGetJSON = function (err, res, body, cb) {
	if (err) return next(err);
	if (res.statusCode != 200) return next(new Error (500));
	try {
		body = JSON.parse(body);
	} catch (e) {
		return next(new Error (500));
	}
}

/**
 * Fetches body.
 * callback is called with (err, obj)
 */
var getBody = exports.getBody = function (req, cb) {

	var body = '';
	req.on('data', function (chunk) {
		body += chunk;
	});

	req.on('end', function () {
		var obj;
		try {
			obj = JSON.parse(body);
		} catch (e) {
			// Backend server might have crashed during our request
			debug('error parsing, backend error');
			cb(new Error(503));
		}
		debug('got json successfully');
		cb(null, obj);
	});

	req.on('error', function () {
		debug('req error');
		cb(new Error(500));
	});
}