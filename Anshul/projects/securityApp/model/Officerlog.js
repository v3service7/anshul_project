var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var OfficerlogSchema = new Schema({
	timestamp: { type: Number},
	officer_id:  { type: String},
    previousRole: {type: String, enum: ['Employee', 'Reject', 'Applicant']},    
	typeOfChange: [{type:String,enum:['Added','Edited','Moved','Deleted']}],
	snippet: { type: Object}
},{ versionKey: false });

var Officerlog = mongoose.model('Officerlog', OfficerlogSchema);

module.exports = Officerlog;