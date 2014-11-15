
// PoolCache.js

var debug = require('debug')('PoolCache');
var utils = require('./utils');
var config = require('./config');
var cache = {};

exports.get = function (id, cb)
{
	var poolData = cache[id];

	if (cache[id] != null) {
		debug('cache hit');
		return cb(null, poolData);
	}

	debug('cache miss');
	getJSON(config.BACKEND_URL + '/pool/' + id, function (err, obj) {
		if (err) return cb(err);
		var poolData = obj;
		PoolCache.save(pid, poolData);
		cb(null, poolData);
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
