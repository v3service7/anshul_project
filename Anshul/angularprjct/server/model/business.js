var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var businessSchema = new Schema({
  	businessName: { type: String, required: true },
  	typeOfOrg: String,
  	tradeLicenseNumber: { type: String, required: true },
  	issuingAuthority: String,
  	tradeLicenseExpiry: { type: String, required: true },
  	emiRate: { type: String, required: true },
  	phoneNumber: { type: String, required: true },
  	ownerName: { type: String, required: true },
  	mobileNumber: { type: String, required: true },
  	passportNumber: { type: String, required: true },
  	nationality: { type: String, required: true },
  	emiRateIdNumber: { type: String, required: true },
    bankName: String,
    bankBranch: String,
    bankAccountNumber: String,
    certificateOfIncorporationNo: String,
  	vattrn: String,
    plan:{ type: Schema.Types.ObjectId, ref:'Plan', required: true},
    ownerId:{ type: Schema.Types.ObjectId, ref:'Customer', required: true},
    siteVisit : { type:String },
    noDaysRequired: String,
    passportFile: String,
    visaFile: String,
    emiRatesIdFile: String,
    tradeLicenseFile: String,
    articleAndPartnershipFile: String,
    certificateOfIncorporationFile: String,
    bankStatement : String,

  	status: { type: Boolean, default: true },
});

var business = mongoose.model('business', businessSchema);
module.exports = business;