var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CountySchema = new Schema({
	__v: {type: Number, select: false},
    countyName: { type: String, trim: true, required: true, unique: true },
    state:  { type: String, uppercase: true, trim: true, required: true }
});

var County = mongoose.model('County', CountySchema);

module.exports = County;