var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BannerSchema = new Schema({
    title: String,
    type: String,
    description: String,
    path : String
});

var Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;