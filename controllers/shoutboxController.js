var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds127391.mlab.com:27391/todo');

mongoose.Promise = require('bluebird');

var todoSchema = new mongoose.Schema({
	name : String,
	comment : String
});

var Todo = mongoose.model('Todo',todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

	app.get('/shoutbox',function(req,res){

		Todo.find({},function(err,data){
			if(err) throw err;
 			res.render('shoutbox',{todos:data});
		});

	});

	app.post('/shoutbox',urlencodedParser,function(req,res){
	
		var newTodo = Todo(req.body).save(function(err){
			if(err) throw err;
			
			Todo.find({},function(err,data){
			if(err) throw err;
 			res.render('shoutbox',{todos:data});
		});


		});

	});
}