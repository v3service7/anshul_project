var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CitySchema = new Schema({
    cityName  : { type: String, trim: true, required: true },    
	state:  { type: String, uppercase: true, trim: true, required: true },
	timestamp: { type: Number}
},{ versionKey: false });

var City = mongoose.model('City', CitySchema);

module.exports = City;