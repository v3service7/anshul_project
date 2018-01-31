var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageSchema = new Schema({
    name: String,
    noofcalls: Number,
    price: String,
    description: String
});

var Package = mongoose.model('Package', PackageSchema);

module.exports = Package;