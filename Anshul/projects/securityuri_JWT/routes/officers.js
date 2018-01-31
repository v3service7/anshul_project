var express = require('express');
var router = express.Router();
var officersModel  =  require("../model/Officer.js");
var countyModel  =  require("../model/County.js");
var stateModel  =  require("../model/State.js");
var cityModel  =  require("../model/City.js");
var skillModel  =  require("../model/Skill.js");
var certificateModel  =  require("../model/Certificate.js");
var securityassignmentModel =  require("../model/Securityassignment.js");
var militaryunitModel  =  require("../model/Militaryunit.js");
var policeunitModel  =  require("../model/Policeunit.js");

/*-------------------------------START OFFICER--------------------------------------------------------*/
router.get('/', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	officersModel.find({role:'Employee'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var officer={};
			officer.employees = [];
			officer.rejects = [];
			for (var i = 0; i < data.length; i++) {
				var empObject = {};
				empObject._id = data[i]._id;
				empObject.firstName = data[i].firstName;
				empObject.nickname = data[i].nickname;
				empObject.lastName = data[i].lastName;
				empObject.residenceCity = data[i].residenceAddress.city;
				empObject.residenceStreet = data[i].residenceAddress.street;
				empObject.phone = data[i].phones[0].phoneNumber;
				empObject.email = data[i].emails[0].emailAddress;
				empObject.isOwl = data[i].isOwl;
				empObject.hasCar = data[i].hasCar;
				empObject.isIndependent = data[i].isIndependent;
				empObject.inEventsRoster = data[i].inEventsRoster;
				empObject.isContractor = data[i].isContractor;
				empObject.isActive = data[i].isActive;
				officer.employees.push(empObject);
			}

			officersModel.find({role:'Reject'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, reason:1,isParmanent:1}).exec(function (err, data) {
				if (err) {
					response = {"error" : true,"message" : "Error fetching data"};
				} else{
					for (var i = 0; i < data.length; i++) {
						var rejectObject = {};
						rejectObject._id = data[i]._id;
						rejectObject.firstName = data[i].firstName;
						rejectObject.nickname = data[i].nickname;
						rejectObject.lastName = data[i].lastName;
						rejectObject.residenceCity = data[i].residenceAddress.city;
						rejectObject.residenceStreet = data[i].residenceAddress.street;
						rejectObject.phone = data[i].phones[0].phoneNumber;
						rejectObject.email = data[i].emails[0].emailAddress;
						rejectObject.isOwl = data[i].isOwl;
						rejectObject.hasCar = data[i].hasCar;
						rejectObject.reason = data[i].reason;
						rejectObject.isParmanent = data[i].isParmanent;						
						officer.rejects.push(rejectObject);
					}
					response = {"error" : false,"message" : officer};
				};
				res.json(response);
			});	
		};
	});	
});

router.get('/employees', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	officersModel.find({role:'Employee'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,exposedPermits:1,ccws:1}).populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var empArray = [];
			for (var i = 0; i < data.length; i++) {
				var empObject = {};
				empObject._id = data[i]._id;
				empObject.firstName = data[i].firstName;
				empObject.nickname = data[i].nickname;
				empObject.lastName = data[i].lastName;
				empObject.residenceCity = data[i].residenceAddress.city.cityName;
				empObject.residenceStreet = data[i].residenceAddress.street;
				empObject.phone = data[i].phones[0].phoneNumber;
				empObject.email = data[i].emails[0].emailAddress;
				empObject.exposedPermits = data[i].expirationDate;
				empObject.exposedPermits = data[i].state;
				empObject.ccws = data[i].state;
				empObject.ccws = data[i].expirationDate;
				empObject.isOwl = data[i].isOwl;
				empObject.hasCar = data[i].hasCar;
				empObject.isIndependent = data[i].isIndependent;
				empObject.inEventsRoster = data[i].inEventsRoster;
				empObject.isContractor = data[i].isContractor;
				empObject.isActive = data[i].isActive;
				empArray.push(empObject);
			}

			response = {"error" : false,"message" : empArray};
		};
		res.json(response);
	});	
});

router.get('/employees/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	
	officersModel.findById(req.params.id).select('-reason').select('-isParmanent').populate({ path: 'referredBy', options: { select: { firstName: 1, lastName: 1 } } }).populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).populate({ path: 'mailingAddress.city', options: { select: { cityName: 1, state: 1 } } }).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/employees',function(req, res){
	console.log(req.body);
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	req.body.role = 'Employee';
	var eror = false;
	
	if (typeof req.body.phones == 'undefined' || req.body.phones.length==0)
		req.body.phones = [{"phoneNumber":""}];
	if (typeof req.body.emails == 'undefined' || req.body.emails.length==0)
		req.body.emails = [{"emailAddress":""}];
	if (typeof req.body.guardCards == 'undefined' || req.body.guardCards.length==0)
		req.body.guardCards = [{"guardCardNumber":""}];
	if (typeof req.body.exposedPermits == 'undefined' || req.body.exposedPermits.length==0)
		req.body.exposedPermits = [{"permitNumber":""}];
	if (typeof req.body.weapons == 'undefined' || req.body.weapons.length==0)
		req.body.weapons = [{"serialNumber":""}];
	if (typeof req.body.credentials == 'undefined' || req.body.credentials.length==0)
		req.body.credentials = [{"certificate":""}];
	if(req.body.isActive==null || req.body.isContractor==null || req.body.inEventsRoster==null || req.body.isIndependent==null)
	{
		eror = true;
		response = {"error" : true, "message" : "isActive/isContractor/inEventsRoster/isIndependent cannot be null"};
	}

	if(!eror)
	{			
		var officers = new officersModel(req.body);
	    officers.save(function(err, officer){
	    	if(err) {	    		
	    		response = {"error" : true, "message" : err};	            
	        } else {
	        	militaryunitModel.find({unitName:req.body.militaryService.unitName},function(err,Mdata){	        	 	
			        if(Mdata.length == 0)
			        {
			        	var militaryunit = new militaryunitModel(req.body.militaryService);
	        			militaryunit.save();
			        }
			    });

	        	policeunitModel.find({unitName:req.body.policeService.unitName},function(err,Pdata){	        	 	
			        if(Pdata.length == 0)
			        {
			        	var policeunit = new policeunitModel(req.body.policeService);
	        			policeunit.save();
			        }
			    });

	        	
	        	//var policeunit = new policeunitModel(req.body.policeService);
	        	//policeunit.save();
	        	response = {"error" : false, "message" : officer};
	        }
	        res.json(response);	        			        
	    });
	}
	else
		res.json(response);					
	
			    
});

router.patch('/employees/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};	
	
	officersModel.findByIdAndUpdate(req.params.id, req.body, function(err, officer) {
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Updated"};
        }
        res.json(response);
    });
	
});

router.delete('/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	
	officersModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

router.get('/rejects', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	officersModel.find({role:'Reject'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1,reason:1,isParmanent:1 }).populate('residenceCity').exec(function (err, data) {

		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var rejArray = [];
			for (var i = 0; i < data.length; i++) {
				var rejObject = {};
				rejObject._id = data[i]._id;
				rejObject.firstName = data[i].firstName;
				rejObject.nickname = data[i].nickname;
				rejObject.lastName = data[i].lastName;
				rejObject.residenceCity = data[i].residenceAddress.city;
				rejObject.residenceStreet = data[i].residenceAddress.street;
				rejObject.phone = data[i].phones[0].phoneNumber;
				rejObject.email = data[i].emails[0].emailAddress;
				rejObject.isOwl = data[i].isOwl;
				rejObject.hasCar = data[i].hasCar;
				rejObject.reason = data[i].reason;
				rejObject.isParmanent = data[i].isParmanent;
				rejArray.push(rejObject);
			}
			response = {"error" : false,"message" : rejArray};
		};
		res.json(response);
	});	
});

router.get('/rejects/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	
	officersModel.findById(req.params.id).select('-isIndependent').select('-inEventsRoster').select('-isContractor').select('-isActive').populate('referredBy').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/rejects',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	req.body.role = 'Reject';
	var eror = false;
	
	if (typeof req.body.phones == 'undefined' || req.body.phones.length==0)
		req.body.phones = [""];
	if (typeof req.body.emails == 'undefined' || req.body.emails.length==0)
		req.body.emails = [""];
	if (typeof req.body.guardCards == 'undefined' || req.body.guardCards.length==0)
		req.body.guardCards = [{"guardCardNumber":""}];
	if (typeof req.body.exposedPermits == 'undefined' || req.body.exposedPermits.length==0)
		req.body.exposedPermits = [{"permitNumber":""}];
	if (typeof req.body.weapons == 'undefined' || req.body.weapons.length==0)
		req.body.weapons = [{"serialNumber":""}];
	if (typeof req.body.credentials == 'undefined' || req.body.credentials.length==0)
		req.body.credentials = [{"certificate":""}];
	if(req.body.reason==null || req.body.isParmanent==null)
	{
		eror = true;
		response = {"error" : true, "message" : "Reason/isParmanent cannot be null"};
	}
	if(!eror)
	{
	    var officers = new officersModel(req.body);
	    officers.save(function(err, officer){
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : officer};
	        }
	        res.json(response);
	    });
	}
	else
		res.json(response);		    
});

router.patch('/rejects/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	officersModel.findByIdAndUpdate(req.params.id, req.body, function(err, officers) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Updated"};
	        }
	        res.json(response);
        });
});

router.patch('/:id/:role',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	var eror = false;
	
	if(req.params.role!="Reject" && req.params.role!="Employee")
	{
		eror = true;
		response = {"error" : true, "message" : "undefined Role"};
	}	
	else if(req.params.role=="Reject" && (req.body.reason==null || req.body.isParmanent==null))
	{
		eror = true;
		response = {"error" : true, "message" : "Reason/isParmanent cannot be null for Reject"};
	}
	else if(req.params.role=="Employee" && (req.body.isActive==null || req.body.isContractor==null || req.body.inEventsRoster==null || req.body.isIndependent==null))
	{
		eror = true;
		response = {"error" : true, "message" : "isActive/isContractor/inEventsRoster/isIndependent cannot be null for Employee"};
	}
	if(!eror)
	{
		req.body.role = req.params.role;
		officersModel.findByIdAndUpdate(req.params.id, req.body, function(err, officers) {
		    	if(err) {
		            response = {"error" : true,"message" : err};
		        } else {
		            response = {"error" : false,"message" : "Data Updated"};
		        }
		        res.json(response);
	    });
	}
	else
		res.json(response);		
});
/*-------------------------------END OFFICER--------------------------------------------------------*/

module.exports = router;
