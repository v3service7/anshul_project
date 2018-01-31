var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CertificateSchema = new Schema({
	__v: {type: Number, select: false},
    certificate: { type: String, trim: true, required: true, unique: true }
});

var Certificate = mongoose.model('Certificate', CertificateSchema);

module.exports = Certificate;