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
	

	var response={};
	officersModel.find({role:'Employee'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,ccws:1,exposedPermits:1}).populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{			
			var officer={};
			officer.employees = [];
			officer.rejects = [];
			for (var i = 0; i < data.length; i++) {
				console.log(data[i]);
				var empObject = {};
				empObject._id = data[i]._id;
				empObject.firstName = data[i].firstName;
				empObject.nickname = data[i].nickname;
				empObject.lastName = data[i].lastName;
				if(data[i].residenceAddress.city)
				{
					empObject.residenceCity = data[i].residenceAddress.city.cityName;
					empObject.residenceState = data[i].residenceAddress.city.state;
				}
				if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)	
					empObject.phone = data[i].phones[0].phoneNumber;

				if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)
					empObject.email = data[i].emails[0].emailAddress;
				
				if(typeof data[i].exposedPermits !== "undefined" && data[i].exposedPermits != null)
				{
					empObject.exposedPermits = [];
					for (var j = 0; j < data[i].exposedPermits.length; j++) {
						var expObject = {};
						expObject.state = data[i].exposedPermits[j].state;
						expObject.expirationDate = data[i].exposedPermits[j].expirationDate;
						empObject.exposedPermits[j] = expObject;
					}
				}
				
				if(typeof data[i].ccws !== "undefined" && data[i].ccws != null)
				{
					empObject.ccws = [];				
					for (var k = 0; k < data[i].ccws.length; k++) {
						var ccwsObject = {};
						ccwsObject.state = data[i].ccws[k].state;
						ccwsObject.expirationDate = data[i].ccws[k].expirationDate;
						empObject.ccws[k] = ccwsObject;
					}
				}
				
				empObject.isOwl = data[i].isOwl;
				empObject.hasCar = data[i].hasCar;
				empObject.isIndependent = data[i].isIndependent;
				empObject.inEventsRoster = data[i].inEventsRoster;
				empObject.isContractor = data[i].isContractor;
				empObject.isActive = data[i].isActive;
				officer.employees.push(empObject);

			}

			officersModel.find({role:'Reject'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, reason:1,isPermanent:1}).populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).exec(function (err, data) {
				if (err) {
					response = {"error" : true,"message" : "Error fetching data"};
				} else{
					for (var i = 0; i < data.length; i++) {
						var rejectObject = {};
						rejectObject._id = data[i]._id;
						rejectObject.firstName = data[i].firstName;
						rejectObject.nickname = data[i].nickname;
						rejectObject.lastName = data[i].lastName;	
						if(data[i].residenceAddress.city) {					
							rejectObject.residenceCity = data[i].residenceAddress.city.cityName;
							rejectObject.residenceState = data[i].residenceAddress.city.state;
						}
						if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
							rejectObject.phone = data[i].phones[0].phoneNumber;
						if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)	
							rejectObject.email = data[i].emails[0].emailAddress;
						rejectObject.isOwl = data[i].isOwl;
						rejectObject.hasCar = data[i].hasCar;
						rejectObject.reason = data[i].reason;
						rejectObject.isPermanent = data[i].isPermanent;						
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
	
	var response={};
	officersModel.find({role:'Employee'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,ccws:1,exposedPermits:1}).populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).exec(function (err, data) {
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
				if(data[i].residenceAddress.city) {	
					empObject.residenceCity = data[i].residenceAddress.city.cityName;
					empObject.residenceState = data[i].residenceAddress.city.state;		
				}		
				if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
					empObject.phone = data[i].phones[0].phoneNumber;
				if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)
					empObject.email = data[i].emails[0].emailAddress;
				
				if(typeof data[i].exposedPermits !== "undefined" && data[i].exposedPermits != null && data[i].exposedPermits.length)
				{
					empObject.exposedPermits = [];
					for (var j = 0; j < data[i].exposedPermits.length; j++) {
						var expObject = {};
						expObject.state = data[i].exposedPermits[j].state;
						expObject.expirationDate = data[i].exposedPermits[j].expirationDate;
						empObject.exposedPermits[j] = expObject;
					}
				}
				
				if(typeof data[i].ccws !== "undefined" && data[i].ccws != null && data[i].ccws.length)
				{
					empObject.ccws = [];				
					for (var k = 0; k < data[i].ccws.length; k++) {
						var ccwsObject = {};
						ccwsObject.state = data[i].ccws[k].state;
						ccwsObject.expirationDate = data[i].ccws[k].expirationDate;
						empObject.ccws[k] = ccwsObject;
					}
				}

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
	
	var response={};
	
	officersModel.findById(req.params.id).select('-reason').select('-isPermanent').populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).populate({ path: 'mailingAddress.city', options: { select: { cityName: 1, state: 1 } } }).populate('ccws.city').exec(function (err, data) {
		
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			if(typeof data.notes !== "undefined" && data.notes != null && data.notes.length){
				for (var i = 0; i < data.notes.length; i++) {
					if(!data.notes[i].content)
						data.notes.splice(i,1);
				}
			}
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/employees',function(req, res){
	
	var response={};
	req.body.role = 'Employee';
	var eror = false;
	if(typeof req.body._id !== 'undefined')
		 delete req.body._id;

	if(!eror)
	{			
		var officers = new officersModel(req.body);
	    officers.save(function(err, officer){
	    	if(err) {	    		
	    		response = {"error" : true, "message" : err};	            
	        } else {
	        	if(typeof req.body.militaryService !== 'undefined' && req.body.militaryService != null)
	        	{
		        	militaryunitModel.find({unitName:req.body.militaryService.unitName},function(err,Mdata){	        	 	
				        if(Mdata.length == 0)
				        {
				        	var militaryunit = new militaryunitModel(req.body.militaryService);
		        			militaryunit.save();
				        }
				    });
	        	}

	        	if(typeof req.body.policeService !== 'undefined' && req.body.policeService != null)
	        	{
		        	policeunitModel.find({unitName:req.body.policeService.unitName},function(err,Pdata){	        	 	
				        if(Pdata.length == 0)
				        {
				        	var policeunit = new policeunitModel(req.body.policeService);
		        			policeunit.save();
				        }
				    });
		        }

	        	response = {"error" : false, "message" : officer};
	        }
	        res.json(response);	        			        
	    });
	}
	else
		res.json(response);					
	
			    
});

router.patch('/employees/:id',function(req, res){
	
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
	
	var response={};
	officersModel.find({role:'Reject'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1,reason:1,isPermanent:1 }).populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).exec(function (err, data) {

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
				if(data[i].residenceAddress.city)
				{
					rejObject.residenceCity = data[i].residenceAddress.city.cityName;
					rejObject.residenceState = data[i].residenceAddress.city.state;
				}
				if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
					rejObject.phone = data[i].phones[0].phoneNumber;
				if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)
					rejObject.email = data[i].emails[0].emailAddress;
				if(data[i].isOwl != false)
				    rejObject.isOwl = data[i].isOwl;
				if(data[i].hasCar != false)
				rejObject.hasCar = data[i].hasCar;
				rejObject.reason = data[i].reason;
				rejObject.isPermanent = data[i].isPermanent;
				rejArray.push(rejObject);
			}
			response = {"error" : false,"message" : rejArray};
		};
		res.json(response);
	});	
});

router.get('/rejects/:id',function(req,res){
	
	var response={};
	
	officersModel.findById(req.params.id).select('-isIndependent').select('-inEventsRoster').select('-isContractor').select('-isActive').populate({ path: 'residenceAddress.city', options: { select: { cityName: 1, state: 1 } } }).populate({ path: 'mailingAddress.city', options: { select: { cityName: 1, state: 1 } } }).populate('ccws.city').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			for (var i = 0; i < data.notes.length; i++) {
				if(!data.notes[i].content)
					data.notes.splice(i,1);
			}
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/rejects',function(req, res){
	
	var response={};
	req.body.role = 'Reject';
	var eror = false;
	
	if(req.body.isPermanent==null)
	{
		eror = true;
		response = {"error" : true, "message" : "isPermanent cannot be null"};
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
	
	var response={};
	var eror = false;
	
	if(req.params.role!="Reject" && req.params.role!="Employee")
	{
		eror = true;
		response = {"error" : true, "message" : "undefined Role"};
	}	
	else if(req.params.role=="Reject" && (req.body.reason==null || req.body.isPermanent==null))
	{
		eror = true;
		response = {"error" : true, "message" : "Reason/isPermanent cannot be null for Reject"};
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
