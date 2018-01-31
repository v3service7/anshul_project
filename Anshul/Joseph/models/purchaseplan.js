// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var PurchaseplanSchema = new Schema({
  	plan: { type: Schema.Types.ObjectId, ref: 'plan' },
  	user: { type: Schema.Types.ObjectId, ref: 'User' },
  	expireddate:{type: Date},
  	paymentId:String,
  	PayerID: String,
  	status: {
        type: String,
        enum : ['Pending','Failed','Success'],
        default: 'Pending'
    },
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Purchaseplan = mongoose.model('Purchaseplan', PurchaseplanSchema);

// make this available to our Exchnage in our Node applications
module.exports = Purchaseplan;