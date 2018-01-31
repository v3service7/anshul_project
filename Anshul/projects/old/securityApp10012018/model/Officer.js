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
    firstName : { type: String, trim: true, required: true},
    middleName : String,
    lastName : { type: String, trim: true, required: true},
    nickname : String,
    referredBy : { 
                    referredByID: {type: Schema.Types.ObjectId, ref: 'Officer'},
                    firstName : String, 
                    lastName : String 
                },
    residenceAddress : {street:String, city:{_id: String, cityName: String, state: String},  zipCode:String},
    mailingAddress : {street:String, city:{_id: String, cityName: String, state: String}, zipCode:String},
    policeService :  {unitName: {type: String, trim: true }, _id: String,startYear:Number, endYear:Number},
    militaryService : {unitName: {type: String, trim: true },_id: String, startYear:Number, endYear:Number},
    phones : [{ 
                    phoneNumber: {type:String, trim: true, required:true},
                    phonetype: String,
                    _id: {type: Number, select: false}
                    }],
    emails : [{ 
                    emailAddress: {type:String, trim: true, required:true},
                    emailtype: String,
                    _id: {type: Number, select: false}
                    }],
    guardCards:[{
                    guardCardNumber: { type: String, trim: true, required: true }, 
                    expirationDate:{ type: String, trim: true, required: true }, 
                    state:{ type: String, uppercase: true, trim: true, required: true },
                    _id: {type: Number, select: false}
                    }],
    exposedPermits:[{
                    permitNumber  : { type: String, trim: true, required: true },
                    state:  { type: String, uppercase: true, trim: true, required: true },
                    expirationDate:  Date,
                    calibers  : String,
                    notes  : String,
                    _id: {type: Number, select: false}
                    }],
    ccws:[{         
                    ccwNumber:{ type: String, trim: true, required: true },    
                    issuingAgency:{ type: String, trim: true, required: true },
                    issueDate:{ type: Date, trim: true, required: true },
                    state:{ type: String, uppercase: true },
                    city:{_id: String, cityName: String, state: String},
                    county:{_id: String, countyName: String, state: String},
                    expirationDate:Date,
                    notes:String,
                    _id: {type: Number, select: false},
                    weapons:[{
                        serialNumber:{ type: String, trim: true, required: true },                       
                        model:String,
                        maker:String,
                        caliber:String,
                        _id: {type: Number, select: false}
                        }] 
                    }], 

    weapons:[{ 
                    serialNumber: { type:String, trim: true, required: true},
                    model:String,
                    maker:String,
                    caliber:{ type:String, trim: true, required: true},
                    _id: {type: Number, select: false}
                    }],         

    skills:[{ type: String, trim: true, required: true }],

    credentials:[{ 
                    certificate : { type: String, trim: true, required: true },
                    issueDate : Date,
                    expirationDate : Date,
                    state : { type: String, uppercase: true },
                    school : String,
                    comments : String,
                    _id: {type: Number, select: false} 
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
    isContractor: { type: Boolean, default: false},
    inEventsRoster: { type: Boolean, default: false },
    isIndependent: { type: Boolean, default: false },

    reason:String,
    isPermanent:{ type: Boolean, default: false },
    timestamp: { type: Number},
    
});

OfficerSchema.path('skills').validate(function(skills, cb){
    if(!skills){return true}
    else if(skills.length === 0){return true}
    else{
        for (var i = skills.length - 1; i >= 0; i--) {                     
            skillModel.find({skillName:skills[i]},function(err,data){
            cb(err || data.length > 0);                  
        });
        }          
    }   
}, 'Invalid Skill');

OfficerSchema.path('securityAssignments').validate(function(securityAssignments, cb){
    if(!securityAssignments){return true}
    else if(securityAssignments.length === 0){return true}
    else{
        for (var i = securityAssignments.length - 1; i >= 0; i--) {            
            securityassignmentModel.find({assignment:securityAssignments[i]},function(err,data){
            cb(err || data.length > 0);                  
        });
        }          
    }   
}, 'Invalid SecurityAssignments');

OfficerSchema.path('credentials').validate(function(credentials, cb){
    if(!credentials){return true}
    else if(credentials.length === 0){return true}
    else{
        for (var i = credentials.length - 1; i >= 0; i--) {            
            certificateModel.find({certificate:credentials[i].certificate},function(err,data){
            cb(err || data.length > 0);                  
        });
        }          
    }   
}, 'Invalid Certificate');

var Officer = mongoose.model('Officer', OfficerSchema);

module.exports = Officer;   