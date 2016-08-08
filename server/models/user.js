var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	email: String,
	password: String,
	company: String,
	company_id: Schema.ObjectId
},{strict:false});



module.exports = mongoose.model('User', UserSchema);
