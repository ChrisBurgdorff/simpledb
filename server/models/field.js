var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//Field Types: Text, Date, Time, Number: Integer, Decimal
var FieldSchema = new Schema({
	title: String,
	type: String
});

module.exports = mongoose.model('Field', FieldSchema);
