var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var customerSchema = new Schema({
	firstname: String,
	lastname: String,
	phone: String,
	gender: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	dateofbirth: String,
	cityName:String,
	countryName:String,
	lat:String,
	lng:String,
	sexualorient : String,
	interests : [],
	profilePic: String,
	profileVideo:String,
	videolinks: [],
	steps: [],
	age:String,
	preferences:{},
	friends:Array,
	friendsRequests:Array,
	blockedUsers:Array,
	visitors:[{ type: Schema.ObjectId, ref: 'Customer' }],
	invitedUsers:Array,
	myPhotos:Array,
	myPoints:Number,
	packagesPurchased:Array,
	Role: {
		type:String,enum:['Admin','User'],default:'Admin'
		},
	Status:	Boolean,
	created_at: Date,
	updated_at: Date,
	mypackage : {},
	online : String,
	socketId : String,
	tokboxsessionid : String,
	tokboxtoken : String,
	description : String,
	islive: Boolean,
	speedstatus:Boolean,
	isbusy: Boolean,
	activate : {type : Boolean, default : false},
	featured : {type : Boolean, default : false},
	country: { type: Schema.ObjectId, ref: 'Country' },
	isprivate : {type : Boolean, default : false},
	isbusyspeed : {type : Boolean, default : false}
});

customerSchema.plugin(passportLocalMongoose);

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;