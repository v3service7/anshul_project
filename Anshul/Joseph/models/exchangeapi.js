// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var ExchnageapiSchema = new Schema({
  	exchangeapiName: String,
  	exchangeUrl: String
});

// the schema is useless so far
// we need to create a model using it
var ExchnageApi = mongoose.model('ExchnageApi', ExchnageapiSchema);

// make this available to our Exchnage in our Node applications
module.exports = ExchnageApi;