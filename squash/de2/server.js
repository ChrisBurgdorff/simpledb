var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var loginController = require('./server/controllers/login-controller.js');

app.get('/',function(req,res) {
	res.sendFile(__dirname + "/client/views/index.html");
});

app.get('/main',function(req,res) {
	res.sendFile(__dirname + "/client/views/main.html");
});

app.use(bodyParser());

app.post('/api/user', loginController.create);

app.post('/api/user/signin', loginController.signin);

app.use('/js', express.static(__dirname + '/client/js'));

mongoose.connect('mongodb://localhost:27017/de2');

app.listen(3000,function() {
	console.log("Application listening on port 3000");
});
