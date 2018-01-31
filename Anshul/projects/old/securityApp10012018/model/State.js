var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var StateSchema = new Schema({
	__v: {type: Number, select: false},
    state: { type: String, trim: true, required: true, unique: true }    
},{ versionKey: false });

var State = mongoose.model('State', StateSchema);

module.exports = State;