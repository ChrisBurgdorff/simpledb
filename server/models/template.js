var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
	title: String,
	company: String,
	fields: []
});


module.exports = mongoose.model('Template',TemplateSchema);
