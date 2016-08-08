var Record = require('../models/record.js');

module.exports.searchRecords = function(req,res) {
    var regex = new RegExp(req.params.searchString, 'i');
	console.log(req.body);
	console.log(JSON.stringify(req.body));
	console.log("searchString is " + req.params.searchString);
	console.log("regex is " + regex);
    return Record.find({fields: regex}, function(err,results){
        return res.json(results);
});
}
