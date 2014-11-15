
var debug = require('debug')('http');
var http = require('http');
var express = require('express');
var app = express();
var PoolCache = require('./PoolCache');

var BACKEND_URL = 'http://1ad4da90.ngrok.com';

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

function getJSON(url, cb)
{
	http.get(url, function (res)
	{
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			var obj = {};
			try {
				obj = JSON.parse(body);
			} catch (e) {
				cb("wololo");
			}
			cb(null, obj);
		});
	});
}

app.param('pid', function (req, res, next, pid) {

	req.pid = pid;

	var poolData = PoolCache.get(pid);
	if (poolData != null) {
		req.poolData = poolData;
		return next();
	}

	/**
	 * poolData object should look like:
	 *   options: <int>
	 */
	debug('getting pool data from backend');
	getJSON(BACKEND_URL + '/pool/' + pid, function (err, obj) {
		if (err) return res.status(500).send({ error: 'something blew up' });
		PoolCache.save(pid, obj);
		req.poolData = obj
		next();
	});

});

app.param('uid', function (req, res, next, uid) {
	req.uid = uid;
	next();
});

app.get('/voter/:pid/:uid', function (req, res) {
	debug('the voter!');
	res.render('voter', {
		options: req.poolData.options,
		voteURL: BACKEND_URL + '/vote/' + req.pid + '/' + req.uid + '/'
	});
});

app.listen(3000);
debug("Yo, it's showtime");
