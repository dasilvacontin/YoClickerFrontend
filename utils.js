
var debug = require('debug')('YoClicker:utils');
var http = require('http');
var request = require('request');

exports.requestJSON = function (params, cb) {
	request(params, function (err, res, body) {
		exports.fromRequestGetJSON(err, res, body, cb);
	});
}

exports.fromRequestGetJSON = function (err, res, body, cb) {
	if (err) {
		debug('request error');
		return cb(err, res, body);
	}
	if (res.statusCode != 200) {
		debug('request statusCode != 200 -> ' + res.statusCode);
		return cb(new Error (500), res, body);
	}
	try {
		body = JSON.parse(body);
	} catch (e) {
		debug('json parse fail, backend error');
		return cb(new Error (500), res, body);
	}
	debug('got response');
	cb(err, res, body);
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
			debug('error parsing, bad json syntax');
			cb(new Error(503));
		}
		debug('got json successfully');
		cb(null, obj);
	});

	req.on('error', function () {
		debug('transfer error');
		cb(new Error(500));
	});
}