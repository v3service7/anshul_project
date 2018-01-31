var io = {};
var methods = 
{
	init : function (signal) { 
		io = signal;
	},
	log : function (msg) { 
		io.sockets.emit('message', { message: msg.data });		
	}
};

module.exports = methods;