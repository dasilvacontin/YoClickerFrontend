
var debug = require('debug')('YoClicker:http');
var express = require('express');
var morgan = require('morgan');
var app = express();
var PoolCache = require('./PoolCache');
var utils = require('./utils');
var config = require('./config');

app.use('/', express.static(__dirname + '/public'));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/**
 * Parameters
 */

var MOCK_SHIT = true;

function mockAccount (req) {
	debug('mocking account');
	req.username = "MOCKUSER";
	req.polls = [];
}

app.param('uid', function (req, res, next, uid) {

	debug('uid param, request account info (username, polls)');
	req.uid = uid;
	utils.requestJSON(
	config.BACKEND_URL+'/account/'+uid,
	function (err, res, json) {
		if (err) {
			if (MOCK_SHIT) {
				mockAccount(req);
				return next();
			}
			return next(err);
		}
		if (!json.username) {
			if (!MOCK_SHIT) next(new Error(401));
			mockAccount(req);
			return next();
		}
		req.username = json.username;
		req.polls = json.polls;
		next();
	});

});

app.param('pollName', function (req, res, next, pollName) {

	req.pollName = pollName;

	PoolCache.get(pollName+'/'+req.params.vid+'/', function (err, poolData) {
		if (err) return next(err);
		req.poolData = poolData;
		req.questions = poolData.questions;
		next();
	});

});

app.param('question', function (req, res, next, question) {
	var questionData = req.questions[question];
	req.questionIndex = question;
	req.question = questionData.question;
	req.answers = questionData.answers;
	next();
});

app.param('answer', function (req, res, next, answer) {
	req.answer = answer;
	next();
});

app.param('vid', function (req, res, next, vid) {
	req.vid = vid;
	next();
});

/* Routes */

app.get('/voter/:pollName/:vid', function (req, res) {

	if (req.questions.length > 1) {

		// render voter with question list
		res.render('voter', {
			pollName: req.pollName,
			questions: req.questions,
			vid: req.vid
		});

	} else if (req.questions.length == 1) {

		// render question
		res.redirect('/voter/'+req.pollName+'/0/'+req.vid);

	} else throw new Error(500);

});

app.get('/voter/:pollName/:question/:vid', function (req, res) {
	res.render('question', {
		pollName: req.pollName,
		questionIndex: req.questionIndex,
		question: req.question,
		answers: req.answers,
		shouldShowBack: (req.questions.length > 1),
		vid: req.vid
	});
});

function voteURL(pollName, questionIndex, answer, vid) {
	return config.BACKEND_URL+'/vote/'+pollName+'/'+questionIndex+'/'+answer+'/'+vid+'/';
}

app.post('/poll/:pollName/:question/:answer/:vid', function (req, res) {
	
	utils.getBody(req, function (err, answer) {
		if (err || req.answer != answer) return res.sendStatus(418);

		//valid request
		utils.requestJSON(
		{
			url: voteURL(req.pollName, req.questionIndex, req.answer, req.vid),
			method: 'POST'
		},
		function(err, r, json) {
			if (err) {
				debug('backend fail');
				return res.sendStatus(503);
			}
			res.send(json.result+'');
		});

	});

});

app.get('/create/:uid', function (req, res) {
	res.render('create', {
		uid: req.uid
	});
})

app.post('/create/:uid', function (req, res) {
	utils.getBody(req, function (err, json) {
		if (err) return res.sendStatus(400);

		//TODO: validate poll json

		utils.requestJSON(
		{
			url: config.BACKEND_URL + '/create/'+req.uid+'/',
			method: 'POST',
			body: JSON.stringify(json)
		},
		function(err, r, json) {
			if (err) {
				debug('backend fail');
				return res.sendStatus(503);
			}
			res.send(json.result+'');
		});

	});
})

app.get('/viewer/', function (req, res) {
	res.render('viewer');
});

app.get('/dashboard/:uid', function (req, res) {
	res.render('dashboard', {
		uid: req.uid,
		username: req.username,
		polls: req.polls
	});
});

app.get('*', function (req, res) {
	res.render('error', {statusCode: 404})
});

app.use(function(err, req, res, next) {
	debug(err);
	debug('error code '+err.message);
    res.render('error', {statusCode: err.message});
});

app.listen(3000);
debug("Yo, it's showtime");
