var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var DeletelogSchema = new Schema({
	timestamp: { type: Number},
	deleted_id:  { type: String},   
	entitycollection: {type:String,enum:['City','County','State','Skill','Certificate','Securityassignment','Militaryunit','Policeunit']}
},{ versionKey: false });

var Deletelog = mongoose.model('Deletelog', DeletelogSchema);

module.exports = Deletelog;