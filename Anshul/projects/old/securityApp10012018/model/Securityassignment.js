var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SecurityassignmentSchema = new Schema({
	__v: {type: Number, select: false},
    assignment  : { type: String, trim: true, required: true, unique: true },
	explanation : String,
	timestamp: { type: Number}
});

var Securityassignment = mongoose.model('Securityassignment', SecurityassignmentSchema);

module.exports = Securityassignment;