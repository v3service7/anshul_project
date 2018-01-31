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
var officerlogModel  =  require("../model/officer-log.js");
var async = require('async');

/*-------------------------------START OFFICER--------------------------------------------------------*/
router.get('/', function(req, res, next) {
	

	var response={};
	officersModel.find({role:'Employee'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,ccws:1,exposedPermits:1}).exec(function (err, data) {
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
				empObject.lastName = data[i].lastName;
				if(data[i].nickname)
					empObject.nickname = data[i].nickname;
				if(data[i].residenceAddress.city)
				{
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
				if(data[i].isOwl)
					empObject.isOwl = data[i].isOwl;
				if(data[i].hasCar)
					empObject.hasCar = data[i].hasCar;
				if(data[i].isIndependent)
					empObject.isIndependent = data[i].isIndependent;
				if(data[i].inEventsRoster)
					empObject.inEventsRoster = data[i].inEventsRoster;
				if(data[i].isContractor)
					empObject.isContractor = data[i].isContractor;
				empObject.isActive = data[i].isActive;
				officer.employees.push(empObject);

			}

			officersModel.find({role:'Reject'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, reason:1,isPermanent:1}).exec(function (err, data) {
				if (err) {
					response = {"error" : true,"message" : "Error fetching data"};
				} else{
					for (var i = 0; i < data.length; i++) {
						var rejectObject = {};
						rejectObject._id = data[i]._id;
						rejectObject.firstName = data[i].firstName;						
						rejectObject.lastName = data[i].lastName;
						if(data[i].nickname)	
							rejectObject.nickname = data[i].nickname;
						if(data[i].residenceAddress.city) {					
							rejectObject.residenceCity = data[i].residenceAddress.city.cityName;
							rejectObject.residenceState = data[i].residenceAddress.city.state;
						}
						if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
							rejectObject.phone = data[i].phones[0].phoneNumber;
						if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)	
							rejectObject.email = data[i].emails[0].emailAddress;
						if(data[i].isOwl)
							rejectObject.isOwl = data[i].isOwl;
						if(data[i].hasCar)
							rejectObject.hasCar = data[i].hasCar;
						if(data[i].reason)
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

router.get('/timestamp/:datetime', function(req, res, next) {
	var response={};
	officersModel.find({role:'Employee',"timestamp":{$gte:req.params.datetime}}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,ccws:1,exposedPermits:1}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{			
			var officer={};
			officer.employees = [];
			officer.rejects = [];
			for (var i = 0; i < data.length; i++) {
				//console.log(data[i]);
				var empObject = {};
				empObject._id = data[i]._id;
				empObject.firstName = data[i].firstName;				
				empObject.lastName = data[i].lastName;
				if(data[i].nickname)
					empObject.nickname = data[i].nickname;
				if(data[i].residenceAddress.city)
				{
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
				if(data[i].isOwl)
					empObject.isOwl = data[i].isOwl;
				if(data[i].hasCar)
					empObject.hasCar = data[i].hasCar;
				if(data[i].isIndependent)
					empObject.isIndependent = data[i].isIndependent;
				if(data[i].inEventsRoster)
					empObject.inEventsRoster = data[i].inEventsRoster;
				if(data[i].isContractor)
					empObject.isContractor = data[i].isContractor;
				empObject.isActive = data[i].isActive;
				officer.employees.push(empObject);

			}

			officersModel.find({role:'Reject',"timestamp":{$gte:req.params.datetime}}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, reason:1,isPermanent:1}).exec(function (err, data) {
				if (err) {
					response = {"error" : true,"message" : "Error fetching data"};
				} else{
					for (var i = 0; i < data.length; i++) {
						var rejectObject = {};
						rejectObject._id = data[i]._id;
						rejectObject.firstName = data[i].firstName;						
						rejectObject.lastName = data[i].lastName;
						if(data[i].nickname)	
							rejectObject.nickname = data[i].nickname;
						if(data[i].residenceAddress.city) {					
							rejectObject.residenceCity = data[i].residenceAddress.city.cityName;
							rejectObject.residenceState = data[i].residenceAddress.city.state;
						}
						if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
							rejectObject.phone = data[i].phones[0].phoneNumber;
						if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)	
							rejectObject.email = data[i].emails[0].emailAddress;
						if(data[i].isOwl)
							rejectObject.isOwl = data[i].isOwl;
						if(data[i].hasCar)
							rejectObject.hasCar = data[i].hasCar;
						if(data[i].reason)
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
	officersModel.find({role:'Employee'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,ccws:1,exposedPermits:1}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var empArray = [];
			for (var i = 0; i < data.length; i++) {
				var empObject = {};
				empObject._id = data[i]._id;
				empObject.firstName = data[i].firstName;				
				empObject.lastName = data[i].lastName;
				if(data[i].nickname)
					empObject.nickname = data[i].nickname;
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
				if(data[i].isOwl)
					empObject.isOwl = data[i].isOwl;
				if(data[i].hasCar)
					empObject.hasCar = data[i].hasCar;
				if(data[i].isIndependent)
					empObject.isIndependent = data[i].isIndependent;
				if(data[i].inEventsRoster)
					empObject.inEventsRoster = data[i].inEventsRoster;
				if(data[i].isContractor)
					empObject.isContractor = data[i].isContractor;
				empObject.isActive = data[i].isActive;
				empArray.push(empObject);
			}

			response = {"error" : false,"message" : empArray};
		};
		res.json(response);
	});	
});

router.get('/employees/timestamp/:datetime', function(req, res, next) {
	
	var response={};
	officersModel.find({role:'Employee',"timestamp":{$gte:req.params.datetime}}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1, isActive:1,isContractor:1,inEventsRoster:1,isIndependent:1,ccws:1,exposedPermits:1}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var empArray = [];
			for (var i = 0; i < data.length; i++) {
				var empObject = {};
				empObject._id = data[i]._id;
				empObject.firstName = data[i].firstName;				
				empObject.lastName = data[i].lastName;
				if(data[i].nickname)
					empObject.nickname = data[i].nickname;
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
				if(data[i].isOwl)
					empObject.isOwl = data[i].isOwl;
				if(data[i].hasCar) 
					empObject.hasCar = data[i].hasCar;
				if(data[i].isIndependent)
					empObject.isIndependent = data[i].isIndependent;
				if(data[i].inEventsRoster)     
					empObject.inEventsRoster = data[i].inEventsRoster;
				if(data[i].isContractor)
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
	officersModel.findById(req.params.id).select('-reason').select('-isPermanent').exec(function (err, data) {
		
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
			res.status(200).json(response);
		} else{
			if(!data){
				response = {"error" : false,"message" : "No Record Found"};
				res.status(404).json(response);
			}else {
				if((typeof data.mailingAddress.city.cityName === 'undefined' && typeof data.mailingAddress.city.state === 'undefined') && (typeof data.mailingAddress.zipCode === 'undefined' || data.mailingAddress.zipCode === null) && (typeof data.mailingAddress.street === 'undefined' || data.mailingAddress.street === null)){
					data.mailingAddress =null;				
			    }
			    if((typeof data.residenceAddress.city.cityName === 'undefined' && typeof data.residenceAddress.city.state === 'undefined') && (typeof data.residenceAddress.zipCode === 'undefined' || data.residenceAddress.zipCode === null) && (typeof data.residenceAddress.street === 'undefined' || data.residenceAddress.street === null)){
					data.residenceAddress =null;				
			    }
				if(typeof data.notes !== "undefined" && data.notes != null && data.notes.length){
				for (var i = 0; i < data.notes.length; i++) {
					if(!data.notes[i].content)
						data.notes.splice(i,1);
					}					
				}
				response = {"error" : false,"message" : data};
				res.status(200).json(response);
			}
		};
	});	
});


router.post('/employees',function(req, res){
	
	var response={};
	var objEmp={}; 
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
	req.body.role = 'Employee';
	var eror = false;
	if(typeof req.body._id !== 'undefined')
		 delete req.body._id;	

	for(var emp in req.body){
		if(typeof req.body[emp] !== 'undefined' && req.body[emp]!=null)
		{	
			if(req.body[emp].isArray && req.body[emp].length)
				objEmp[emp] =  req.body[emp];
			if(!req.body[emp].isArray)
				objEmp[emp] =  req.body[emp];
		}
	}		

	if(!eror)
	{	
        async.series([
		    function (callback) {		    		
		    	if(typeof req.body.militaryService !== 'undefined' && req.body.militaryService != null)
		    	{
		    		if(typeof req.body.militaryService._id === 'undefined' || req.body.militaryService._id == null)
		    		{
		    			let militarydata={};
				    	militarydata.unitName =req.body.militaryService.unitName;
				    	militarydata.timestamp= d;
				    	var militaryunit = new militaryunitModel(militarydata);
						militaryunit.save(function(err,Mdata){
							objEmp.militaryService._id=Mdata._id;       
		        			callback(null, Mdata._id);							
						});
		    		}
		    		else
		    			callback(null, 1);		    		
		    	}
		    	else
   					callback(null, 1);			    	
		    },
		    function (callback) {
		        if(typeof req.body.policeService !== 'undefined' && req.body.policeService != null)
		    	{
		    		if(typeof req.body.policeService._id === 'undefined' || req.body.policeService._id == null)
		    		{
		    			let policedata={};
				    	policedata.unitName =req.body.policeService.unitName;
				    	policedata.timestamp= d;
				    	var policeunit = new policeunitModel(policedata);
						policeunit.save(function(err,Pdata){
							objEmp.policeService._id=Pdata._id;        
		        			callback(null, Pdata._id);							
						});
		    		}
		    		else
		    			callback(null, 2);		
		    	}
		    	else
		    		callback(null, 2);		
		    },
		    function (callback) {		        
		        
				var officers = new officersModel(objEmp);
				officers.save(function(err, officer){	
			    	if(err) {	    		
			    		response = {"error" : true, "message" : err};	            
			        } else {	        	
			        	if (typeof req.body.mailingAddress === "undefined" || req.body.mailingAddress==null)
							officer.mailingAddress = null;
						else if ((typeof req.body.mailingAddress.street==='undefined' || req.body.mailingAddress.street==null) &&
						(typeof req.body.mailingAddress.zipCode==='undefined' || req.body.mailingAddress.zipCode==null)) {
							if((typeof req.body.mailingAddress.city==='undefined' || req.body.mailingAddress.city==null))
								officer.mailingAddress = null;
							else if ((typeof req.body.mailingAddress.city.cityName==='undefined' || req.body.mailingAddress.city.cityName == null) && (typeof req.body.mailingAddress.city.state==='undefined' || req.body.mailingAddress.city.state == null))
								officer.mailingAddress = null;		
						}

						if (typeof req.body.residenceAddress === "undefined" || req.body.mailingAddress==null)
							officer.residenceAddress = null;
						else if ((typeof req.body.residenceAddress.street==='undefined' || req.body.residenceAddress.street==null) &&
						(typeof req.body.residenceAddress.zipCode==='undefined' || req.body.residenceAddress.zipCode==null)) {
							if((typeof req.body.residenceAddress.city==='undefined' || req.body.residenceAddress.city==null))
								officer.residenceAddress = null;
							else if ((typeof req.body.residenceAddress.city.cityName==='undefined' || req.body.residenceAddress.city.cityName == null) && (typeof req.body.residenceAddress.city.state==='undefined' || req.body.residenceAddress.city.state == null))
								officer.residenceAddress = null;		
						}
		
						response = {"error" : false,"message" : officer};			
			        }  
		        	callback(null, response);
			    });	
			    
		    }
		],
		function (err, result) {
			officelog={};
			officelog.timestamp = d;
			officelog.previousRole = 'Employee';
			officelog.officer_id = result[2]._id;
			officelog.typeOfChange = 'Added';
			officelog.snippet = result[2];
			officerdata= officerlogModel(officelog);
			officerdata.save(function(err,data){
				if(err){
					response = {"error" : false,"message" : err};	
				}else{
					response = {"error" : false,"message" : data};
				}
				res.json(response);
			});		
		    res.json(result[2]);
		});
	}
	else
		res.json(response);					
			    
});

router.patch('/employees/:id',function(req, res){
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
	async.series([
		    function (callback) {		    		
		    	if(typeof req.body.militaryService !== 'undefined' && req.body.militaryService != null)
		    	{
		    		if(typeof req.body.militaryService._id === 'undefined' || req.body.militaryService._id == null)
		    		{
		    			let militarydata={};
				    	militarydata.unitName =req.body.militaryService.unitName;
				    	militarydata.timestamp= d;
				    	var militaryunit = new militaryunitModel(militarydata);
						militaryunit.save(function(err,Mdata){
							req.body.militaryService._id=Mdata._id;       
		        			callback(null, Mdata._id);							
						});
		    		}
		    		else
		    			callback(null, 1);		    		
		    	}
		    	else
   					callback(null, 1);			    	
		    },
		    function (callback) {
		        if(typeof req.body.policeService !== 'undefined' && req.body.policeService != null)
		    	{
		    		if(typeof req.body.policeService._id === 'undefined' || req.body.policeService._id == null)
		    		{
		    			let policedata={};
				    	policedata.unitName =req.body.policeService.unitName;
				    	policedata.timestamp= d;
				    	var policeunit = new policeunitModel(policedata);
						policeunit.save(function(err,Pdata){
							req.body.policeService._id=Pdata._id;        
		        			callback(null, Pdata._id);							
						});
		    		}
		    		else
		    			callback(null, 2);		
		    	}
		    	else
		    		callback(null, 2);		
		    },
		    function (callback) {
		    	officersModel.findByIdAndUpdate(req.params.id, req.body, function(err, officer) {
			    	if(err) {
			            response = {"error" : true,"message" : err, stat:200};
			            //res.status(200).json(response);
			        } else {
						if (!officer) {
							response = {"error" : false,"message" : "No Record Found", stat:404};
							//res.status(404).json(response);
						}else{
							response = {"error" : false,"message" : "Data Updated", stat:200};
							//res.status(200).json(response);
						}
			        }
			        callback(null, response);
			    });			        
			    
		    }
		],
		function (err, result) {
			var sta = result[2].stat;
			delete result[2].stat;
			res.status(sta).json(result[2]);
		});
});

router.delete('/:id',function(req,res){
	
	var response={};
	
	officersModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : err};
			res.status(200).json(response);
		} else{	
			if(data.result.n){
				response = {"error" : false,"message" : "Data Deleted Successfully"};
				res.status(200).json(response);
			}else{
				response = {"error" : false,"message" : "No Record Found"};
				res.status(404).json(response);
			}
		};
		
	});	
});

router.get('/rejects', function(req, res, next) {
	
	var response={};
	officersModel.find({role:'Reject'}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1,reason:1,isPermanent:1 }).exec(function (err, data) {

		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var rejArray = [];
			for (var i = 0; i < data.length; i++) {
				var rejObject = {};
				rejObject._id = data[i]._id;
				rejObject.firstName = data[i].firstName;				
				rejObject.lastName = data[i].lastName;
				if(data[i].nickname)
					rejObject.nickname = data[i].nickname;
				if(data[i].residenceAddress.city)
				{
					rejObject.residenceCity = data[i].residenceAddress.city.cityName;
					rejObject.residenceState = data[i].residenceAddress.city.state;
				}
				if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
					rejObject.phone = data[i].phones[0].phoneNumber;
				if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)
					rejObject.email = data[i].emails[0].emailAddress;
				//rejObject.isOwl = data[i].isOwl;
				//rejObject.hasCar = data[i].hasCar;
				if(data[i].reason)
					rejObject.reason = data[i].reason;
				rejObject.isPermanent = data[i].isPermanent;
				rejArray.push(rejObject);
			}
			response = {"error" : false,"message" : rejArray};
		};
		res.json(response);
	});	
});

router.get('/rejects/timestamp/:datetime', function(req, res, next) {
	
	var response={};
	officersModel.find({role:'Reject',"timestamp":{$gte:req.params.datetime}}, { firstName: 1, nickname: 1, lastName:1, phones: 1, emails: 1 ,residenceAddress:1,hasCar:1,isOwl:1,reason:1,isPermanent:1 }).exec(function (err, data) {

		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			var rejArray = [];
			for (var i = 0; i < data.length; i++) {
				var rejObject = {};
				rejObject._id = data[i]._id;
				rejObject.firstName = data[i].firstName;				
				rejObject.lastName = data[i].lastName;
				if(data[i].nickname)
					rejObject.nickname = data[i].nickname;
				if(data[i].residenceAddress.city)
				{
					rejObject.residenceCity = data[i].residenceAddress.city.cityName;
					rejObject.residenceState = data[i].residenceAddress.city.state;
				}
				if(typeof data[i].phones !== "undefined" && data[i].phones != null && data[i].phones.length)
					rejObject.phone = data[i].phones[0].phoneNumber;
				if(typeof data[i].emails !== "undefined" && data[i].emails != null && data[i].emails.length)
					rejObject.email = data[i].emails[0].emailAddress;
				//rejObject.isOwl = data[i].isOwl;
				//rejObject.hasCar = data[i].hasCar;
				if(data[i].reason)
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
	
	officersModel.findById(req.params.id).select('-isIndependent').select('-inEventsRoster').select('-isContractor').select('-isActive').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
			res.status(200).json(response);
		} else{
			if(!data){
				response = {"error" : false,"message" : "No Record Found"};
				res.status(404).json(response);
			}else {
				if((typeof data.mailingAddress.city.cityName === 'undefined' && typeof data.mailingAddress.city.state === 'undefined') && (typeof data.mailingAddress.zipCode === 'undefined' || data.mailingAddress.zipCode === null) && (typeof data.mailingAddress.street === 'undefined' || data.mailingAddress.street === null)){
					data.mailingAddress =null;				
			    }
			    if((typeof data.residenceAddress.city.cityName === 'undefined' && typeof data.residenceAddress.city.state === 'undefined') && (typeof data.residenceAddress.zipCode === 'undefined' || data.residenceAddress.zipCode === null) && (typeof data.residenceAddress.street === 'undefined' || data.residenceAddress.street === null)){
					data.residenceAddress =null;				
			    }
				if(typeof data.notes !== "undefined" && data.notes != null && data.notes.length){
					for (var i = 0; i < data.notes.length; i++) {
						if(!data.notes[i].content)
							data.notes.splice(i,1);
					}
				}
				response = {"error" : false,"message" : data};
				res.status(200).json(response);
			}
		};
	});	
});

router.post('/rejects',function(req, res){
	
	var response={};
	req.body.role = 'Reject';
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
	var eror = false;
	var objReject={};
	if(typeof req.body._id !== 'undefined')
		delete req.body._id;
	if(req.body.isPermanent==null)
	{
		eror = true;
		response = {"error" : true, "message" : "isPermanent cannot be null"};
	}
	for(var reject in req.body){
		if(typeof req.body[reject] !== 'undefined' && req.body[reject]!=null)
		{	
			if(req.body[reject].isArray && req.body[reject].length)
				objReject[reject] =  req.body[reject];
			if(!req.body[reject].isArray)
				objReject[reject] =  req.body[reject];
		}
	}	
	
	if(!eror)
	{
		
		async.series([
		    function (callback) {		    		
		    	if(typeof req.body.militaryService !== 'undefined' && req.body.militaryService != null)
		    	{
		    		if(typeof req.body.militaryService._id === 'undefined' || req.body.militaryService._id == null)
		    		{
		    			let militarydata={};
				    	militarydata.unitName =req.body.militaryService.unitName;
				    	militarydata.timestamp= d;
				    	var militaryunit = new militaryunitModel(militarydata);
						militaryunit.save(function(err,Mdata){
							objReject.militaryService._id=Mdata._id;       
		        			callback(null, Mdata._id);							
						});
		    		}
		    		else
		    			callback(null, 1);		    		
		    	}
		    	else
   					callback(null, 1);			    	
		    },
		    function (callback) {
		        if(typeof req.body.policeService !== 'undefined' && req.body.policeService != null)
		    	{
		    		if(typeof req.body.policeService._id === 'undefined' || req.body.policeService._id == null)
		    		{
		    			let policedata={};
				    	policedata.unitName =req.body.policeService.unitName;
				    	policedata.timestamp= d;
				    	var policeunit = new policeunitModel(policedata);
						policeunit.save(function(err,Pdata){
							objReject.policeService._id=Pdata._id;        
		        			callback(null, Pdata._id);							
						});
		    		}
		    		else
		    			callback(null, 2);		
		    	}
		    	else
		    		callback(null, 2);		
		    },
		    function (callback) {		        
		        
				var officers = new officersModel(objReject);
				officers.save(function(err, officer){	
			    	if(err) {	    		
			    		response = {"error" : true, "message" : err};	            
			        } else {	        	
			        	if((typeof req.body.mailingAddress !== "undefined") && ((typeof req.body.mailingAddress.city === 'undefined') || ((typeof req.body.mailingAddress.city !== "undefined") &&  (req.body.mailingAddress.city.cityName === null &&  req.body.mailingAddress.city.state === null))) && (typeof req.body.mailingAddress.zipCode === 'undefined' || req.body.mailingAddress.zipCode === null) && (typeof req.body.mailingAddress.street === 'undefined' || req.body.mailingAddress.street === null)){
							officer.mailingAddress = null;
						}

						if((typeof req.body.residenceAddress !== "undefined") && ((typeof req.body.residenceAddress.city === 'undefined') || ((typeof req.body.residenceAddress.city !== "undefined") &&  (req.body.residenceAddress.city.cityName === null &&  req.body.residenceAddress.city.state === null))) && (typeof req.body.residenceAddress.zipCode === 'undefined' || req.body.residenceAddress.zipCode === null) && (typeof req.body.residenceAddress.street === 'undefined' || req.body.residenceAddress.street === null)){
							officer.residenceAddress = null;
						}
						response = {"error" : false,"message" : officer};			
			        }  
		        	callback(null, response);
			    });	
			    
		    }
		],
		function (err, result) {			
		    res.json(result[2]);
		});
	}
	else
		res.json(response);		    
});

router.patch('/rejects/:id',function(req, res){	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
	async.series([
		    function (callback) {		    		
		    	if(typeof req.body.militaryService !== 'undefined' && req.body.militaryService != null)
		    	{
		    		if(typeof req.body.militaryService._id === 'undefined' || req.body.militaryService._id == null)
		    		{
		    			let militarydata={};
				    	militarydata.unitName =req.body.militaryService.unitName;
				    	militarydata.timestamp= d;
				    	var militaryunit = new militaryunitModel(militarydata);
						militaryunit.save(function(err,Mdata){
							req.body.militaryService._id=Mdata._id;       
		        			callback(null, Mdata._id);							
						});
		    		}
		    		else
		    			callback(null, 1);		    		
		    	}
		    	else
   					callback(null, 1);			    	
		    },
		    function (callback) {
		        if(typeof req.body.policeService !== 'undefined' && req.body.policeService != null)
		    	{
		    		if(typeof req.body.policeService._id === 'undefined' || req.body.policeService._id == null)
		    		{
		    			let policedata={};
				    	policedata.unitName =req.body.policeService.unitName;
				    	policedata.timestamp= d;
				    	var policeunit = new policeunitModel(policedata);
						policeunit.save(function(err,Pdata){
							req.body.policeService._id=Pdata._id;        
		        			callback(null, Pdata._id);							
						});
		    		}
		    		else
		    			callback(null, 2);		
		    	}
		    	else
		    		callback(null, 2);		
		    },
		    function (callback) {
		    	officersModel.findByIdAndUpdate(req.params.id, req.body, function(err, officer) {
			    	if(err) {
			            response = {"error" : true,"message" : err, stat:200};
			            //res.status(200).json(response);
			        } else {
						if (!officer) {
							response = {"error" : false,"message" : "No Record Found", stat:404};
							//res.status(404).json(response);
						}else{
							response = {"error" : false,"message" : "Data Updated", stat:200};
							//res.status(200).json(response);
						}
			        }
			        callback(null, response);
			    });			        
			    
		    }
		],
		function (err, result) {
			var sta = result[2].stat;
			delete result[2].stat;
			res.status(sta).json(result[2]);
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
