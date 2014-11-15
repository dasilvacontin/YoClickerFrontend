
var debug = require('debug')('YoClicker:http');
var http = require('http');
var express = require('express');
var app = express();
var PoolCache = require('./PoolCache');
var utils = require('./utils');

app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/**
 * Parameters
 */

app.param('uid', function (req, res, next, uid) {
	req.uid = uid;
	next();
});

app.param('pid', function (req, res, next, pid) {

	req.pid = pid;

	PoolCache.get(pid, function (err, poolData) {
		if (err) return next(err);
		req.poolData = poolData;
		next();
	});

});

app.param('vid', function (req, res, next, vid) {
	req.vid = vid;
	next();
});

/* Routes */

app.get('/voter/:pollName/:vid', function (req, res) {
	debug('the voter!');
	res.render('voter', {
		options: req.poolData.options,
		voteURL: BACKEND_URL + '/vote/' + req.pid + '/' + req.uid + '/'
	});
});

app.get('/create/:uid', function (req, res) {
	res.render('create');
})

app.get('/dashboard/:uid', function (req, res) {
	res.render('dashboard', {
		uid: req.uid,
		username: 'MLLOBET',
		polls: [{
			name: 'DOTJS2014',
			pid: 937124
		},
		{
			name: 'DOTSWIFT2015',
			pid: 128576
		}]
	});
});

app.get('*', function (req, res) {
	res.render('error', {statusCode: 404})
});

app.use(function(err, req, res, next){
	debug(err);
    res.render('error', {statusCode: err.message});
});

app.listen(3000);
debug("Yo, it's showtime");
