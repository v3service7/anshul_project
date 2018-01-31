var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CitySchema = new Schema({
    cityname:  { type: String, required: true },
    state:  { type: String, required: true },
    description: { type: String, required: true },
    image:String
});

var page = mongoose.model('city', CitySchema);

module.exports = page;