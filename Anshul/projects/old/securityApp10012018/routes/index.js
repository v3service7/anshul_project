var express = require('express');
var router = express.Router();
var multer = require('multer');
const csv=require('csvtojson');
var countyModel  =  require("../model/County.js");
var stateModel  =  require("../model/State.js");
var cityModel  =  require("../model/City.js");
var skillModel  =  require("../model/Skill.js");
var certificateModel  =  require("../model/Certificate.js");
var securityassignmentModel  =  require("../model/Securityassignment.js");
var militaryunitModel  =  require("../model/Militaryunit.js");
var policeunitModel  =  require("../model/Policeunit.js");
var unique = require("array-unique").immutable;


/*-------------------------------START COUNTY--------------------------------------------------------*/

router.get('/counties', function(req, res, next) {
	
	var response={};
	countyModel.find({}).exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false, "count" : data.length , "message" : data};
		};
		res.json(response);
	});	
});

router.post('/counties',function(req, res){
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
    var county = new countyModel(req.body);
    countyModel.find({ "countyName": req.body.countyName}).exec(function (err, data) {
    	if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
        }else{ 
            if(data.length>0){
                response = {"error" : true,"message" : "Data already exits"};
                res.json(response);
            }else{
            	county.save(function(err){
			    	if(err) {
			            response = {"error" : true,"message" : err};
			        } else {
			            response = {"error" : false,"message" : "Data added"};
			        }
			        res.json(response);
		    	});
            }
        }
    });
});

router.put('/counties/:id',function(req, res){
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
	countyModel.find({"countyName": req.body.countyName}).exec(function (err, data) {
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        }else{
            if(data.length>0){
                countyModel.find({"_id":req.params.id,"countyName": req.body.countyName}).exec(function (err, data) {
                    if (err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                        res.json(response);
                    } else{
                        if(data.length>0){
                            countyModel.findByIdAndUpdate(req.params.id, req.body, function(err, county) {
                                if (err) {
                                    response = { "error": true, "message": err };
                                } else {
                                    response = { "error": false, "message": "Data Update" };
                                }
                            });                           
                        }else{
                            response = {"error" : true,"message" : "Data already exits"};  
                        }
                        res.json(response);
                    }
                });
            }else{
                countyModel.findByIdAndUpdate(req.params.id, req.body, function(err, county) {
			    	if(err) {
			            response = {"error" : true,"message" : err};
			        } else {
			            response = {"error" : false,"message" : "Data Update"};
			        }
			        res.json(response);
		        });
            }
        };       
    });
	
});

router.get('/counties/:id',function(req,res){
	
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

router.get('/counties/timestamp/:datetime',function(req,res){
	
	var response={};
	countyModel.find({"timestamp":{$gte:req.params.datetime}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/counties/:id',function(req,res){
	
	var response={};
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
	
	var response={};
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
	
	var response={};
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
	
	var response={};
	cityModel.find({}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false, "count" : data.length ,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/cities',function(req, res){

	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
    var city = new cityModel(req.body);
    cityModel.find({ "cityName": req.body.cityName}).exec(function (err, data) {
    	if (err) {
             response = {"error" : true,"message" : "Error fetching data"};
        }else{ 
            if(data.length>0){
                response = {"error" : true,"message" : "Data already exits"};
                res.json(response);
            }else{
            	city.save(function(err){
			    	if(err) {
			            response = {"error" : true,"message" : err};
			        }else {
			            response = {"error" : false,"message" : "Data added"};
			        }
			        res.json(response);
			    });
            }
        }
    });
});

router.put('/cities/:id',function(req, res){
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
	cityModel.find({"cityName": req.body.cityName}).exec(function (err, data) {
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        }else{
            if(data.length>0){
                cityModel.find({"_id":req.params.id,"cityName": req.body.cityName}).exec(function (err, data) {
                    if (err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                        res.json(response);
                    } else{
                        if(data.length>0){
                            cityModel.findByIdAndUpdate(req.params.id, req.body, function(err, city) {
                                if (err) {
                                    response = { "error": true, "message": err };
                                } else {
                                    response = { "error": false, "message": "Data Update" };
                                }
                            });                           
                        }else{
                            response = {"error" : true,"message" : "Data already exits"};  
                        }
                        res.json(response);
                    }
                });
            }else{
                cityModel.findByIdAndUpdate(req.params.id, req.body, function(err, city) {
			    	if(err) {
			            response = {"error" : true,"message" : err};
			        } else {
			            response = {"error" : false,"message" : "Data Update"};
			        }
			        res.json(response);
		        });
            }
        };       
    });	
});

router.get('/cities/:id',function(req,res){
	
	var response={};
	cityModel.find({state:req.params.id}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/cities/timestamp/:datetime',function(req,res){
	
	var response={};
	cityModel.find({"timestamp":{$gte:req.params.datetime}}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/cities/:id',function(req,res){
	
	var response={};
	cityModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		}else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END CITY--------------------------------------------------------*/

/*-------------------------------START SKILL--------------------------------------------------------*/
router.get('/skills', function(req, res, next) {
	
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
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	 
	var response={};
	skillModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/skills/timestamp/:datetime',function(req,res){
	
	var response={};
	skillModel.find({"timestamp":{$gte:req.params.datetime}}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/skills/:id',function(req,res){
	
	var response={};
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
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	
	var response={};
	certificateModel.find({state:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/certificates/timestamp/:datetime',function(req,res){
	
	var response={};
	certificateModel.find({"timestamp":{$gte:req.params.datetime}}).exec(function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/certificates/:id',function(req,res){
	
	var response={};
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



/*-------------------------------START SECURITYASSIGNMENT--------------------------------------------------------*/
router.get('/securityassignments', function(req, res, next) {
	
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
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	
	var response={};
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	
	var response={};
	securityassignmentModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/securityassignments/timestamp/:datetime',function(req,res){
	
	var response={};
	securityassignmentModel.find({"timestamp":{$gte:req.params.datetime}}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/securityassignments/:id',function(req,res){
	
	var response={};
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
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	militaryunitModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});
router.get('/militaryunits/timestamp/:datetime',function(req,res){
	
	var response={};
	militaryunitModel.find({"timestamp":{$gte:req.params.datetime}}).exec(function (err, data) {
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
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	var d = Math.floor(Date.now() / 1000);
	req.body.timestamp = d;
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
	policeunitModel.findById(req.params.id).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/policeunits/timestamp/:datetime',function(req,res){
	
	var response={};
	policeunitModel.find({"timestamp":{$gte:req.params.datetime}}).exec(function (err, data) {
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

/*-------------------------------START UPLOAD CITY AND COUNTY FILE--------------------------------------------------------*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename:  (req, file, cb) => {
    var abc = file.originalname.split('.');
    var abcl = abc.length - 1;
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + abc[abcl])
  }
});
 
var upload = multer({storage: storage}).single('file');

router.post('/upload', (req, res) => {
  upload(req,res,function(err){
    if(err){
     res.json({error_code:1,err_desc:err});
     return;
    }else{  
      var resultdata = []
      var resultCounty = []
      const csvFilePath='./public/uploads/'+req.file.filename;
      csv()
      .fromFile(csvFilePath)
      .on('json',(jsonObj)=>{
            var resultObject = {};
            var resultCountyobject = {};
            var d = Math.floor(Date.now() / 1000);
            if(jsonObj.city && jsonObj.county_name && jsonObj.state_id){
	            if(jsonObj.city != "" && jsonObj.state_id != ""){
		      		resultObject.cityName = jsonObj.city;
		      		resultObject.state = jsonObj.state_id;
					resultObject.timestamp = d;
		      		resultdata.push(resultObject);
	            }
	            if(jsonObj.county_name != "" && jsonObj.state_id != ""){
		      		resultCountyobject.countyName = jsonObj.county_name;
		      		resultCountyobject.state = jsonObj.state_id;
		      		resultCountyobject.timestamp = d;           
		            resultCounty.push(resultCountyobject); 
	            }
	        }    
       })          
      .on('done', (error)=>{
          var response={};
          cityModel.collection.insert(resultdata, function(err, list) {
				if (err) {
					response = {"error" : true,"message" : "err"};
					res.json(response);
				}else{	
					var countydata = resultCounty;
					var uniques = [];
					for (var i = 0, l = countydata.length; i < l; i++) {
					    var unique = true;
					    for (var j = 0, k = uniques.length; j < k; j++) {
					        if ((countydata[i].countyName === uniques[j].countyName) && (countydata[i].state === uniques[j].state)) {
					            unique = false;
					        }
					    }
					    if (unique) {
					        uniques.push(countydata[i]);
					    }
					}		
					countyModel.collection.insert(uniques, function(err, list) {
						if (err) {
							response = {"error" : true,"message" : "err"};
						}else{
							response = {"error" : false,"message" : "Data added"};
						}
						res.json(response);
					});                
              	}
             // res.json(response);
         	});
      	}); 
    }
  });
});


router.get('/county/:id',function(req,res){
	
	var response={};
	console.log(req.params.id);
	countyModel.find({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/city/:id',function(req,res){
	
	var response={};
	console.log(req.params.id);
	cityModel.findById({_id:req.params.id}).exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


/*-------------------------------END UPLOAD CITY AND COUNTY FILE--------------------------------------------------------*/

module.exports = router;
