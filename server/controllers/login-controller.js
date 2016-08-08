var User = require('../models/user.js');
var Company = require('../models/company.js');

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

module.exports.create = function(req,res) {
	var user = new User(req.body);
	var compFound = false;
	var nameFound = false;
	User.find({'company':user.company},function(err,results) {
		if(results && results.length > 0 && user.company != "" && user.company != null && user.company != undefined) {
			compFound = true;
			console.log("Company already found");
			res.json({email:"Com"});
		} else {
			if (user.company == "" || user.company == undefined || user.company == null) {
				console.log("In new if");
				user.company = user.email;
				console.log("New user.company = " + user.company);
			}
			console.log("Company not found.");
			User.find({'email':user.email},function(err,results){
				if(results && results.length > 0) {
					nameFound = true;
					console.log("Email already found.");
					res.json({email:"Ema"});
				} else {
					user.company_id = Schema.ObjectId();
					user.save(function(err,result) {
						if(err) {
							console.log(err);
						} else {
							res.json(result);
						}
					});
				}
			});
		}
	} );
}

module.exports.editUser = function(req,res) {
	User.findById(req.params.user_id, function(err,user) {
		if(err) {
			res.send(err);
		} else {
			user.company_id = req.body.company_id;
			user.save(function(err) {
				if(err) {
					res.send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
}

module.exports.signin = function(req,res) {
	User.find(req.body,function(err,results) {
			if(err) {
				console.log("ERROR OUT");
			}
			if(results &&  results.length === 1) {
				var userData = results[0];
				//console.log("Results in a-c.js login");
				console.log('user found');
				res.json({email: req.body.email,
							_id: userData._id,
							password: req.body.email,
							company: userData.company,
							company_id: userData.company_id});
							} else {
				console.log("Incorrect Email or Password");
				res.json( {email: "Err",
							_id: "Err" });
			}
		});
}
