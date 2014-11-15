
// PoolCache.js

var debug = require('debug')('YoClicker:PoolCache');
var utils = require('./utils');
var config = require('./config');
var cache = {};

exports.get = function (id, cb)
{
	var poolData = cache[id];

	if (cached[id] != null) {
		debug('cache hit');
		return cb(null, poolData);
	}

	getJSON(config.BACKEND_URL + '/pool/' + pid, function (err, obj) {
		if (err) return next(err);
		PoolCache.save(pid, obj);
		req.poolData = obj
		next();
	});
}

var save = function (id, data)
{
	debug('saved cache for ' + id);
	cache[id] = data;
}