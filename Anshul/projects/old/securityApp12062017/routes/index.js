var express = require('express');
var router = express.Router();
var countyModel  =  require("../model/County.js");
var stateModel  =  require("../model/State.js");
var cityModel  =  require("../model/City.js");
var skillModel  =  require("../model/Skill.js");
var certificateModel  =  require("../model/Certificate.js");
var securityassignmentModel  =  require("../model/Securityassignment.js");
var militaryunitModel  =  require("../model/Militaryunit.js");
var policeunitModel  =  require("../model/Policeunit.js");


/*-------------------------------START COUNTY--------------------------------------------------------*/

router.get('/counties', function(req, res, next) {
	
	var response={};
	countyModel.find({}, {_id:0}, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/counties',function(req, res){
	
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

router.put('/counties/:countyName',function(req, res){
	
	var response={};
	countyModel.findOneAndUpdate(req.params.countyName, req.body, function(err, county) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/counties/:countyName',function(req,res){
	
	var response={};
	console.log(req.params.countyName);
	countyModel.find({countyName:req.params.countyName},{_id:0},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/counties/:countyName',function(req,res){
	
	var response={};
	console.log(req.params.countyName);
	countyModel.remove({countyName:req.params.countyName},function(err,data){
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
	
	var response={};
	stateModel.find({},{_id:0}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/states',function(req, res){
	
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

router.put('/states/:state',function(req, res){
	
	var response={};
	stateModel.findOneAndUpdate(req.params.state, req.body, function(err, state) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/states/:state',function(req,res){
	
	var response={};
	console.log(req.params.state);
	stateModel.findOne({state:req.params.state},{_id:0}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/states/:state',function(req,res){
	
	var response={};
	console.log(req.params.state);
	stateModel.remove({state:req.params.state},function(err,data){
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

router.put('/cities/:cityName',function(req, res){
	
	var response={};
	cityModel.findOneAndUpdate(req.params.cityName, req.body, function(err, city) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/cities/:cityName',function(req,res){
	
	var response={};
	console.log(req.params.cityName);
	cityModel.findOne({cityName:req.params.cityName},{_id:0}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/cities/:cityName',function(req,res){
	
	var response={};
	console.log(req.params.cityName);
	cityModel.remove({cityName:req.params.cityName},function(err,data){
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
	
	var response={};
	skillModel.find({},{_id:0}, {sort: {created_at: 1}},function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/skills',function(req, res){
	
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

router.put('/skills/:skillName',function(req, res){
	
	var response={};
	skillModel.findOneAndUpdate(req.params.skillName, req.body, function(err, skill) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/skills/:skillName',function(req,res){
	
	var response={};
	console.log(req.params.skillName);
	skillModel.findOne({skillName: req.params.skillName},{_id:0}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/skills/:skillName',function(req,res){
	
	var response={};
	console.log(req.params.skillName);
	skillModel.remove({skillName:req.params.skillName},function(err,data){
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
	
	var response={};
	certificateModel.find({},{_id:0} ).exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/certificates',function(req, res){
	
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

router.put('/certificates/:certificate',function(req, res){
	
	var response={};
	certificateModel.findOneAndUpdate(req.params.certificate, req.body, function(err, certificate) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/certificates/:certificate',function(req,res){
	
	var response={};
	console.log(req.params.certificate);
	certificateModel.findOne({certificate:req.params.certificate},{_id:0}).exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/certificates/:certificate',function(req,res){
	
	var response={};
	console.log(req.params.certificate);
	certificateModel.remove({certificate:req.params.certificate},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END CERTIFICATE--------------------------------------------------------*/



/*-------------------------------START SECURITYASSIGNMENT--------------------------------------------------------*/
router.get('/securityassignments', function(req, res, next) {
	
	var response={};
	securityassignmentModel.find({},{_id:0}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/securityassignments',function(req, res){
	
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

router.put('/securityassignments/:assignment',function(req, res){
	
	var response={};
	securityassignmentModel.findOneAndUpdate(req.params.assignment, req.body, function(err, securityassignment) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/securityassignments/:assignment',function(req,res){
	
	var response={};
	console.log(req.params.assignment);
	securityassignmentModel.findOne({assignment:req.params.assignment},{_id:0}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/securityassignments/:assignment',function(req,res){
	
	var response={};
	console.log(req.params.assignment);
	securityassignmentModel.remove({assignment:req.params.assignment},function(err,data){
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


module.exports = router;
