var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../model/Customer.js');

var friendsSchema = new Schema({  
  FromId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  ToId:{ type: Schema.Types.ObjectId, ref: 'Customer' },
  status: { type: Number, default: 0 },
  created_at: Date,
  updated_at: Date
});

var Friend = mongoose.model('Friends', friendsSchema);

module.exports = Friend;