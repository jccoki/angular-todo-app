var router = require('express').Router();
var mongoose = require('mongoose');

// define the mongo model
// @todo should separate this
var Todo = mongoose.model('Todo', {
    text : String
});

// get all todos
router.get('/api/todos', function(req, res){
	// use mongoose to get all todos in the database
	Todo.find(function(err, todos){
    // if there is an error retrieving, send the error
    if (err)
      res.status(500).send({error: err});

    // return all todos in JSON format
    res.status(200).json(todos);
  });
});

// get specific todo
router.get('/api/todos/:todo_id', function(req, res){
	// get todo record using _id
  params = {_id : req.params.todo_id}
	Todo.find(params, function(err, todo){
    if (err)
      res.status(500).send({error: err});

    res.status(200).json(todo);
  });
});

// create a new todo
router.post('/api/todos', function(req, res){
  // creates a todo item, data comes from angular
  var params = {text : req.body.text}
  Todo.create(params, function(err, todo){
    if (err)
      res.status(500).send({error: err});

    res.status(201).json(todo)
  });
});

// delete a todo
router.delete('/api/todos/:todo_id', function(req, res){
  var params = {_id : req.params.todo_id}
  Todo.remove(params, function(err, todo){
    if (err)
      res.status(500).send({error: err});

    res.status(200).send({});
  });
});


// application -------------------------------------------------------------
router.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
