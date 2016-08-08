var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//Field Types: Text, Date, Time, Number: Integer, Decimal
var Field = new Schema({
	title: String,
	type: String
});

var Template = new Schema({
	title: String,
	fields: [Field]
});

var UserSchema = new Schema({
	email: String,
	password: String,
	company: String,
	templates: [Template]
});

var Comments = new Schema({
    title     : String
  , body      : String
  , date      : Date
});

module.exports = mongoose.model('User', UserSchema);
