var io = {};
var methods = 
{
	init : function (signal) { 
		io = signal;
	},
	log : function (msg) { 
		console.log(msg.data);
		io.sockets.emit('message', { message: msg.data });		
	}
};

module.exports = methods;