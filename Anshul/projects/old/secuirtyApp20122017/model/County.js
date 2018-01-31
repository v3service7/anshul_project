var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CountySchema = new Schema({
    countyName: { type: String, trim: true, required: true, unique: true },
    state:  { type: String, uppercase: true, trim: true, required: true }
},{ versionKey: false });

var County = mongoose.model('County', CountySchema);

module.exports = County;