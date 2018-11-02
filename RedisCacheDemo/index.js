//index.js

var express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	app = express(),
    mongoUrl = 'mongodb://mongo:27017/textmonkey',
    bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())
	
var redisClient = require('redis').createClient;
var redis = redisClient(6379, "redis");

var access = require('./access.js');

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, client) {
    if (err)
        throw 'Error connecting to database - ' + err;
        
    var db = client.db('textmonkey');
	
	app.post('/book', function(req,res) {
		if (!req.body.title || !req.body.author)
			res.status(400).send("Please send a title and an author for the book");
		else if (!req.body.text)
			res.status(400).send("Please send some text for the book");
		else {
            access.saveBook(db, req.body.title, req.body.author, req.body.text, function(err) {
				if (err)
					res.status(500).send("Server error");
				else
					res.status(201).send("Saved");
            });
		}
	});
	
	app.get('/book/:title', function(req,res) {
		if (!req.param('title'))
			res.status(400).send("Please send a proper title");
		else {
            access.findBookByTitleCached(db, redis, req.param('title'), function(book) {
				if (!book)
					res.status(500).send("Server error");
				else
					res.status(200).send(book);
            });
		}
	});
	
	app.listen(8000, function() {
		console.log('Listening on port 8000');
	});
});