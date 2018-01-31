var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SkillSchema = new Schema({
	__v: {type: Number, select: false},
    skillName  : { type: String, trim: true, required: true, unique: true },
    description : String,
    timestamp: { type: Number}

});

//db.createCollection("skills", { collation: { locale: 'en_US', strength: 2 } } )
//db.myCollection.createIndex({skillName: 1}, {collation: {locale: "en", strength: 2}});

var Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;