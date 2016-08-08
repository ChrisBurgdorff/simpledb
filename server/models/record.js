var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var RecordSchema = new Schema({
	company_id: Schema.ObjectId,
	user_id: Schema.ObjectId,
	template: String,
	fields: []
},{strict:false});



module.exports = mongoose.model('Record', RecordSchema);