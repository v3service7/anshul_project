var mongoose = require('mongoose');
var Schema = mongoose.Schema;

cityModel  =  require("../model/City.js");
countyModel  =  require("../model/County.js");
stateModel  =  require("../model/State.js");
securityassignmentModel  =  require("../model/Securityassignment.js");
skillModel  =  require("../model/Skill.js");
certificateModel  =  require("../model/Certificate.js");


// create a schema
var OfficerSchema = new Schema({
    __v: {type: Number, select: false},
    firstName : { type: String, trim: true, required: true, match : [/^[A-Za-z]+$/, 'First Name should not be Numeric']},
    middleName : String,
    lastName : { type: String, trim: true, required: true, match : [/^[A-Za-z]+$/, 'Last Name should not be Numeric']},
    nickname : String,
    referredBy : { type: Schema.Types.ObjectId, ref: 'Officer' },
    residenceAddress : {street:String, city:{type: Schema.Types.ObjectId, ref: 'City'}, zipCode:String},
    mailingAddress : {street:String, city:{type: Schema.Types.ObjectId, ref: 'City'}, zipCode:String},
    policeService :  {unitName: {type: String, trim: true, required: true }, startYear:String, endYear:String},
    militaryService : { unitName: {type: String, trim: true, required: true }, startYear:String, endYear:String},
    phones : [{ 
                    phoneNumber: {type:String, trim: true, required:true},
                    phonetype: String
                    }],
    emails : [{ 
                    emailAddress: {type:String, trim: true, required:true},
                    emailtype: String
                    }],
    guardCards:[{
                    guardCardNumber: { type: String, trim: true, required: true }, 
                    expirationDate:{ type: String, trim: true, required: true }, 
                    state:{ type: String, uppercase: true, trim: true, required: true }
                    }],
    exposedPermits:[{
                    permitNumber  : { type: String, trim: true, required: true },
                    state:  { type: String, uppercase: true, trim: true, required: true },
                    expirationDate:  Date,
                    calibers  : String,
                    notes  : String
                    }],
    ccws:[{         
                    ccwNumber:{ type: String, trim: true, required: true },    
                    issuingAgency:{ type: String, trim: true, required: true },
                    issueDate:{ type: Date, trim: true, required: true },
                    state:{ type: String, uppercase: true },
                    city:String,
                    county:String,
                    expirationDate:Date,
                    notes:String,
                    weapons:[{
                        weaponSerialNumber:{ type: String, trim: true, required: true },                       
                        model:String,
                        maker:String,
                        caliber:String
                        }] 
                    }], 

    weapons:[{ 
                    serialNumber: { type:String, trim: true, required: true},
                    model:String,
                    maker:String,
                    caliber:{ type:String, trim: true, required: true}
                    }],         

    skills:[{ type: String, trim: true, required: true,  unique: true }],

    credentials:[{ 
                    certificate : { type: String, trim: true, required: true },
                    issueDate : Date,
                    expirationDate : Date,
                    state : { type: String, uppercase: true },
                    school : String,
                    comments : String 
                    }],

    securityAssignments:[{ type: String, trim: true, required: true }],
    notes: Array,
    interviewDate : Date, 
    orientationDate : Date,
    hasCar : { type: Boolean, default: false },
    isOwl : { type: Boolean, default: false },    
    role : {type: String, enum: ['Employee', 'Reject', 'Applicant']},
    entryTime : { type: Date, time: true },
    
    isActive: { type: Boolean, default: false },
    isContractor: { type: Boolean, default: false },
    inEventsRoster: { type: Boolean, default: false },
    isIndependent: { type: Boolean, default: false },

    reason:String,
    isPermanent:{ type: Boolean, default: false }
    
});

/*
OfficerSchema.path('mailingAddress.city').validate(function(city, cb) {
    cityModel.find({cityName:city},function(err,data){
        cb(err || data.length > 0);
    });
}, 'Invalid City in Mailing Address');

OfficerSchema.path('residenceAddress.city').validate(function(city, cb) {
    cityModel.find({cityName:city},function(err,data){
        cb(err || data.length > 0);
    });
}, 'Invalid City in Residence Address');
*/

OfficerSchema.path('skills').validate(function(skills, cb){
    if(!skills){return false}
    else if(skills.length === 0){return false}
    else{
        for (var i = skills.length - 1; i >= 0; i--) {                     
            skillModel.find({skillName:skills[i]},function(err,data){
            cb(err || data.length > 0);                  
        });
        }          
    }   
}, 'Invalid Skill');

OfficerSchema.path('securityAssignments').validate(function(securityAssignments, cb){
    if(!securityAssignments){return false}
    else if(securityAssignments.length === 0){return false}
    else{
        for (var i = securityAssignments.length - 1; i >= 0; i--) {            
            securityassignmentModel.find({assignment:securityAssignments[i]},function(err,data){
            cb(err || data.length > 0);                  
        });
        }          
    }   
}, 'Invalid SecurityAssignments');

OfficerSchema.path('credentials').validate(function(credentials, cb){
    if(!credentials){return false}
    else if(credentials.length === 0){return false}
    else{
        for (var i = credentials.length - 1; i >= 0; i--) {            
            certificateModel.find({certificate:credentials[i].certificate},function(err,data){
            cb(err || data.length > 0);                  
        });
        }          
    }   
}, 'Invalid Certificate');

OfficerSchema.path('ccws').validate(function(ccws, cb){
    if(!ccws){return false}
    else if(ccws.length === 0){return false}
    else{
        for (var i = ccws.length - 1; i >= 0; i--) {   
            //console.log(ccws[i].city); 
            //console.log(ccws[i].state); 
            //console.log(ccws[i].county); 
            if(ccws[i].city==null && ccws[i].state==null && ccws[i].county==null)
            {
                //console.log("0"); 
                return false
            }
            if(ccws[i].city && ccws[i].state)
            {
                //console.log("1");    
                cityModel.find({cityName:ccws[i].city, state:ccws[i].state},function(err,data){
                cb(err || data.length > 0);                  
                });
            }
            else if(ccws[i].city)
            {
                //console.log("2"); 
                cityModel.find({cityName:ccws[i].city},function(err,data){
                cb(err || data.length > 0);                  
                });
            }
            if(ccws[i].county && ccws[i].state)
            {
                //console.log("3"); 
                countyModel.find({countyName:ccws[i].county, state:ccws[i].state},function(err,data){
                cb(err || data.length > 0);                  
                });
            }
            else if(ccws[i].county)
            {
                //console.log("4"); 
                countyModel.find({countyName:ccws[i].county},function(err,data){
                cb(err || data.length > 0);                  
                });
            }

        }          
    }   
}, 'Invalid/Undefined City/State/County in CCWS');


var Officer = mongoose.model('Officer', OfficerSchema);

module.exports = Officer;   