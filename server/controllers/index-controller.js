var User = require('../models/user.js');
var Company = require('../models/company.js');
var Template = require('../models/template.js');
var Field = require('../models/field.js');
var Record = require('../models/record.js');

module.exports.addTemplate = function(req,res) {
	
}

module.exports.getTemplates = function(req,res) {
	Template.find({},function(err,results) {
		if(results && results.length > 0) {
			res.json(results);
		} else {
			res.json(req.body);
		}
	}); 
}

module.exports.addCompany = function(req,res) {
	var company = new Company(req.body);
	company.save(function(err,result) {
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
}

module.exports.getCompany = function(req,res) {
	Company.findById(req.params.comp_id, function(err,comp) {
		if(err) {
			res.send(err);
		} else {
			res.json(comp);
		}
	});
}

module.exports.editCompany = function(req,res) {
	Company.findById(req.body._id, function(err,comp) {
		if(err) {
			res.send(err);
		} else {
			comp.templates = req.body.templates;
			comp.save(function(err){
				if(err) {
					res.send(err);
				} else {
					res.json(comp);
				}
			});
		}
	});
}

module.exports.addRecord = function(req,res) {
	var record = new Record(req.body);
	record.save(function(err,result) {
		if(err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
}