// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var ExchnageSchema = new Schema({
  	exchangeName: { type: Schema.Types.ObjectId, ref: 'ExchnageApi' },
  	exchangeType: String,
  	nickName: String,
  	apiKey: String,
  	secretKey: String,
  	user: { type: Schema.Types.ObjectId, ref: 'User' },
  	status: { type: Boolean, default: true },
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Exchnage = mongoose.model('Exchnage', ExchnageSchema);

// make this available to our Exchnage in our Node applications
module.exports = Exchnage;