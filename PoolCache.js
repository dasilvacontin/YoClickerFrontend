
// PoolCache.js

var debug = require('debug')('YoClicker:PoolCache');
var utils = require('./utils');
var config = require('./config');
var cache = {};


// Taste the rainbow
exports.get = function (poolName, cb)
{
	var poolData = cache[poolName];

	if (cache[poolName] != null) {
		debug('cache hit');
		return cb(null, poolData);
	}

	debug('cache miss');
	var url = config.BACKEND_URL + '/poll/' + poolName;
	debug('requesting: '+url);
	utils.requestJSON(
	url,
	function (err, res, json) {
		if (err) return cb(err);
		if (json.result === 0) return cb(new Error (404));
		save(poolName, json);
		cb(null, json);
	});
}

var save = function (id, data)
{
	for (var i = 0; i < data.questions.length; ++i) {
		var q = data.questions[i];
		q.question = q.question.toUpperCase();
		for (var j = 0; j < q.answers.length; ++j)
			q.answers[j] = q.answers[j].toUpperCase();
	}
	debug('saved cache for ' + id);
	cache[id] = data;
}

/* MockUp Data */

save('DOTJS2014', {
	"questions" : [
        {
            "question" :  "What does the Fox say?",
            "answers"  : [
            	"Ring-ding-ding-ding-dingeringeding!",
            	"Gering-ding-ding-ding-dingeringeding!",
            	"Wa-pa-pa-pa-pa-pa-pow!",
            	"Hatee-hatee-hatee-ho!",
            	"Joff-tchoff-tchoffo-tchoffo-tchoff!",
            	"Tchoff-tchoff-tchoffo-tchoffo-tchoff!"
            ]
        },
        {
            "question" :  "best speaker award",
            "answers"  : [
            	"Yehuda Katz",
            	"Angus Croll",
            	"Justin Meyer",
            	"Domenic Denicola"
            ]
        }
    ]
});
