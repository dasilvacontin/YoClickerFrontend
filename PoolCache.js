
// PoolCache.js

var debug = require('debug')('PoolCache')
var cache = {};

exports.get = function (id)
{
	return cache[id];
}

exports.save = function (id, data)
{
	debug('saved cache for ' + id);
	cache[id] = data;
}