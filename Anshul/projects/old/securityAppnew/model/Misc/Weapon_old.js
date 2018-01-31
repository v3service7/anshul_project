var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var WeaponSchema = new Schema({
    serialNumber:String,
    model:String,
    maker:String,
    caliber:String


});

var Weapon = mongoose.model('Weapon', WeaponSchema);

module.exports = Weapon;