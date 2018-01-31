var express = require('express');
var router = express.Router();
var countyModel  =  require("../model/County.js");
var stateModel  =  require("../model/State.js");
var cityModel  =  require("../model/City.js");
var skillModel  =  require("../model/Skill.js");
var certificateModel  =  require("../model/Certificate.js");
var credentialModel  =  require("../model/Credential.js");
var securityassignmentModel  =  require("../model/Securityassignment.js");
var militaryunitModel  =  require("../model/Militaryunit.js");
var policeunitModel  =  require("../model/Policeunit.js");
var weaponModel  =  require("../model/Weapon.js");
var ccwsModel  =  require("../model/Ccws.js");
var guardcardModel  =  require("../model/Guardcard.js");
var exposedpermitModel  =  require("../model/Exposedpermit.js");

/*-------------------------------START COUNTY--------------------------------------------------------*/

router.get('/counties', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	countyModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/counties',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var county = new countyModel(req.body);
    county.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/counties/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	countyModel.findByIdAndUpdate(req.params.id, req.body, function(err, county) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/counties/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	countyModel.find({state:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/counties/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	countyModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END COUNTY--------------------------------------------------------*/

/*-------------------------------START STATE--------------------------------------------------------*/
router.get('/states', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	stateModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/states',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var state = new stateModel(req.body);
    state.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/states/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	stateModel.findByIdAndUpdate(req.params.id, req.body, function(err, state) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/states/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	stateModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/states/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	stateModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END STATE--------------------------------------------------------*/

/*-------------------------------START CITY--------------------------------------------------------*/
router.get('/cities', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	cityModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/cities',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var city = new cityModel(req.body);
    city.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/cities/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	cityModel.findByIdAndUpdate(req.params.id, req.body, function(err, city) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/cities/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	cityModel.find({state:req.params.id}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/cities/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	cityModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END CITY--------------------------------------------------------*/

/*-------------------------------START SKILL--------------------------------------------------------*/
router.get('/skills', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	skillModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/skills',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var skill = new skillModel(req.body);
    skill.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/skills/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	skillModel.findByIdAndUpdate(req.params.id, req.body, function(err, skill) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/skills/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	skillModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/skills/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	skillModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END SKILL--------------------------------------------------------*/

/*-------------------------------START CERTIFICATE--------------------------------------------------------*/

router.get('/certificates', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	certificateModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/certificates',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var certificate = new certificateModel(req.body);
    certificate.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/certificates/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	certificateModel.findByIdAndUpdate(req.params.id, req.body, function(err, certificate) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/certificates/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	certificateModel.find({state:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/certificates/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	certificateModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END CERTIFICATE--------------------------------------------------------*/

/*-------------------------------START CREDENTIAL--------------------------------------------------------*/
router.get('/credentials', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	credentialModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/credentials',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var credential = new credentialModel(req.body);
    credential.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/credentials/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	credentialModel.findByIdAndUpdate(req.params.id, req.body, function(err, credential) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/credentials/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	credentialModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/credentials/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	credentialModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END CREDENTIAL--------------------------------------------------------*/

/*-------------------------------START SECURITYASSIGNMENT--------------------------------------------------------*/
router.get('/securityassignments', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	securityassignmentModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/securityassignments',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var securityassignment = new securityassignmentModel(req.body);
    securityassignment.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/securityassignments/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	securityassignmentModel.findByIdAndUpdate(req.params.id, req.body, function(err, securityassignment) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/securityassignments/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	securityassignmentModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/securityassignments/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	securityassignmentModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END SECURITYASSIGNMENT--------------------------------------------------------*/

/*-------------------------------START MILITARYUNIT--------------------------------------------------------*/
router.get('/militaryunits', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	militaryunitModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/militaryunits',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var militaryunit = new militaryunitModel(req.body);
    militaryunit.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/militaryunits/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	militaryunitModel.findByIdAndUpdate(req.params.id, req.body, function(err, militaryunit) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/militaryunits/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	militaryunitModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/militaryunits/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	militaryunitModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END MILITARYUNIT--------------------------------------------------------*/

/*-------------------------------START POLICEUNIT--------------------------------------------------------*/
router.get('/policeunits', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	policeunitModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/policeunits',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var policeunit = new policeunitModel(req.body);
    policeunit.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/policeunits/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	policeunitModel.findByIdAndUpdate(req.params.id, req.body, function(err, policeunit) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/policeunits/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	policeunitModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/policeunits/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	policeunitModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END POLICEUNIT--------------------------------------------------------*/


/*-------------------------------START WEAPON--------------------------------------------------------*/
router.get('/weapons', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	weaponModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/weapons',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var weapon = new weaponModel(req.body);
    weapon.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/weapons/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	weaponModel.findByIdAndUpdate(req.params.id, req.body, function(err, weapon) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/weapons/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	weaponModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/weapons/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	weaponModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END WEAPON--------------------------------------------------------*/

/*-------------------------------START CCWS--------------------------------------------------------*/
router.get('/ccws', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	ccwsModel.find({}).populate('weapons').populate('state').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/ccws',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var ccws = new ccwsModel(req.body);
    ccws.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/ccws/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	ccwsModel.findByIdAndUpdate(req.params.id, req.body, function(err, ccws) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/ccws/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	ccwsModel.findById(req.params.id).populate('weapons').populate('state').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/ccws/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	ccwsModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END CCWS--------------------------------------------------------*/

/*-------------------------------START exposedpermit--------------------------------------------------------*/
router.get('/exposedpermits', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	exposedpermitModel.find({}).populate('state').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/exposedpermits',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var exposedpermit = new exposedpermitModel(req.body);
    exposedpermit.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/exposedpermits/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	exposedpermitModel.findByIdAndUpdate(req.params.id, req.body, function(err, exposedpermit) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/exposedpermits/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	exposedpermitModel.findById(req.params.id).populate('state').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/exposedpermits/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	exposedpermitModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END exposedpermit--------------------------------------------------------*/

/*-------------------------------START GUARDCARD--------------------------------------------------------*/
router.get('/guardcards', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	guardcardModel.find({}).populate('state').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/guardcards',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var guardcard = new guardcardModel(req.body);
    guardcard.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/guardcards/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	guardcardModel.findByIdAndUpdate(req.params.id, req.body, function(err, guardcard) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/guardcards/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	guardcardModel.findById(req.params.id).populate('state').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/guardcards/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	guardcardModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END GUARDCARD--------------------------------------------------------*/

module.exports = router;
