var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var adminSettingSchema = new Schema({
	username:{type: String, required: true, unique: true},
	email: {type:String,required: true, unique: true},
	password:{type: String, unique: true},
	status: { type: Boolean, default: true },
	settings: Array,
	created_at: Date,
	updated_at: Date
});

var AdminSetting = mongoose.model('AdminSetting', adminSettingSchema);

// make this available to our users in our Node applications
module.exports = AdminSetting;