var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('TransactionBook', ['Books']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/books', function(req, res){
	console.log('Received find all books request');
	db.Books.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/book/:id', function(req, res){
	console.log('Received findOne book request');
	console.log(req.params.id);
	db.Books.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addBook', function(req, res){
	console.log(req.body);
	db.Books.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deleteBook/:id', function(req, res){
	console.log("Received delete one book request...");
	db.Books.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updateBook', function(req, res){
	console.log("Received updateBook request");
	db.Books.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)},
										update: {$set: {bookname: req.body.bookname, authName: req.body.authName, isbnCode: req.body.isbnCode, amount: req.body.amount, pubdate: req.body.pubdate, category: req.body.category, numiss: req.body.numiss}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})
	});

//////////////////////////////////////////////////////
app.get('/transactions/:id', function(req, res){
	console.log('Received findOne book transactions request');
	console.log(req.params.id);
	db.Books.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs.transactions);
		res.json(docs);
	})
});

app.listen(3000);
console.log("server running on port 3000");
