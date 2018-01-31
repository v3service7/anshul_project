    
var signalR = {};
var methods = 
{
	init : function (signal) { 
		signalR = signal;
	},
	log : function (msg) { 
		console.log('broadcast' + msg);
		signalR.broadcast({time:new Date()});		
	}
};

module.exports = methods;
