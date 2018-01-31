var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CitySchema = new Schema({
	__v: {type: Number, select: false},
    cityName  : { type: String, trim: true, required: true },    
	state:  { type: String, uppercase: true, trim: true, required: true }
});

var City = mongoose.model('City', CitySchema);

module.exports = City;