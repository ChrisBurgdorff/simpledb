var mongoose=require('mongoose');
var Schema = mongoose.Schema;



var CompanySchema = new Schema({
	name: String,
	users: [String],
	templates: []
});

module.exports = mongoose.model('Company', CompanySchema);
