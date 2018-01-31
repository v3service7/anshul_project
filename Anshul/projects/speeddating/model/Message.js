var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  fromCustId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  toCustId:{ type: Schema.Types.ObjectId, ref: 'Customer' },
  message : String,
  toSocketId : String,
  fromSocketId : String,  
  created_at: Date,
  isread : { type: Boolean, default: false },
  created_at : { type: Date, default: Date.now }  
});

var message = mongoose.model('Message', messageSchema);

module.exports = message;