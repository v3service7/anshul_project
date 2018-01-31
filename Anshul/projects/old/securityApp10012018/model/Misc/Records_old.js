var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RecordsSchema = new Schema({
    username: String,
    password: String,
    emailId: String
});

var Records = mongoose.model('Records', RecordsSchema);

module.exports = Records;