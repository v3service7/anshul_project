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


/*-------------------------------START COUNTY--------------------------------------------------------*/

router.get('/counties', function(req, res, next) {
	
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
	
	var response={};
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

router.delete('/counties/:id',function(req,res){
	
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
			        } else {
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
      const csvFilePath='./public/uploads/'+req.file.filename;
      csv()
      .fromFile(csvFilePath)
      .on('json',(jsonObj)=>{
            var resultObject = {};
      		resultObject.cityName = jsonObj.cityName;
      		resultObject.state = jsonObj.state;
            resultdata.push(resultObject);  
       })          
      .on('done', (error)=>{
          var response={};
          cityModel.collection.insert(resultdata, function(err, list) {
              if (err) {
                response = {"error" : true,"message" : "err"};
              }else{
                response = {"error" : false,"message" : "Data added"};
              }
              res.json(response);
         });       
      }); 
    }
  });
});


router.post('/uploadcounty', (req, res) => {
  upload(req,res,function(err){
    if(err){
     res.json({error_code:1,err_desc:err});
     return;
    }else{  
      var resultdata = []
      const csvFilePath='./public/uploads/'+req.file.filename;
      csv()
      .fromFile(csvFilePath)
      .on('json',(jsonObj)=>{
      	    var resultObject = {};
      		resultObject.countyName = jsonObj.countyName;
      		resultObject.state = jsonObj.state;
            resultdata.push(resultObject);  
       })          
      .on('done', (error)=>{
          var response={};
          countyModel.collection.insert(resultdata, function(err, list) {
              if (err) {
                response = {"error" : true,"message" : "err"};
              }else{
                response = {"error" : false,"message" : "Data added"};
              }
              res.json(response);
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

router.get('/cityy/:page', function(req, res, next) {
	var perpage = 10;
	var skip = (req.params.page - 1)*perpage;
	var response={};
	cityModel.find({},{},{limit:perpage,skip:skip}).exec(function (err, data) {
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
