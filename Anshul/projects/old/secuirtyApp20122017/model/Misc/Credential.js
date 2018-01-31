var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CredentialSchema = new Schema({
    certificate : String,
    issueDate : String,
    expirationDate : String,
    state : String,
    school : String,
    comments : String
});

var Credential = mongoose.model('Credential', CredentialSchema);

module.exports = Credential;