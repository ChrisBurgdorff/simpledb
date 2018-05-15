var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var loginController = require('./server/controllers/login-controller.js');
var indexController = require('./server/controllers/index-controller.js');
var searchController = require('./server/controllers/search-controller.js');

app.get('/',function(req,res) {
	res.sendFile(__dirname + "/client/views/index.html");
});

app.get('/main',function(req,res) {
	res.sendFile(__dirname + "/client/views/main.html");
});

//app.use(express.static('/', __dirname + '/client/views/'));

//app.use(express.static('/styles/', __dirname + '/client/views/styles/'));

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'client/views/'))); //  "public" off of current is root


app.use(bodyParser());

app.post('/api/user', loginController.create);

app.post('/api/user/signin', loginController.signin);

app.post('/api/company', indexController.addCompany);

app.post('/api/template', indexController.addTemplate);

app.post('/api/record', indexController.addRecord);

app.get('/api/company/:comp_id', indexController.getCompany);

app.put('/api/user/:user_id', loginController.editUser);

app.put('/api/company/', indexController.editCompany);

app.use('/js', express.static(__dirname + '/client/js'));

app.get('/api/search/:searchString', searchController.searchRecords);

mongoose.connect('mongodb://sgarcia914:Ahib0914@ec2-52-37-70-209.us-west-2.compute.amazonaws.com:27017/de2');

app.listen(process.env.PORT || 3000,function() {
	console.log("Application listening on port 3000");
});
