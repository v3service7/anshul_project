var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var PoliceunitSchema = new Schema({
	__v: {type: Number, select: false},
    unitName: { type: String, trim: true, required: true, unique: true }
});

var Policeunit = mongoose.model('Policeunit', PoliceunitSchema);

module.exports = Policeunit;