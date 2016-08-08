var User = require('../models/user.js');

module.exports.create = function(req,res) {
	var user = new User(req.body);
	user.save(function(err,result) {
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
}

module.exports.signin = function(req,res) {
	User.find(req.body,function(err,results) {
			if(err) {
				console.log("ERROR OUT");
			}
			if(results && results.length === 1) {
				var userData = results[0];
				//console.log("Results in a-c.js login");
				console.log('user found');
				res.json({email: req.body.email,
							_id: userData._id});
			} else {
				console.log("Incorrect Email or Password");
				res.json( {email: "Err",
							_id: "Err" });
			}
		});
}
