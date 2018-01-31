
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../model/Customer.js');


var notificationSchema = new Schema({  
  FromId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  ToId:{ type: Schema.Types.ObjectId, ref: 'Customer' },
  title : {type: String},  
  isread : {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
  });


var Notification = mongoose.model('Notificatios', notificationSchema);


module.exports = Notification;