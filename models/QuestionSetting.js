const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const questionSettingSchema = mongoose.Schema({
   questionType: {type: mongoose.SchemaTypes.ObjectId, ref: 'QuestionType'},
   numberOfQuestions: Number,
   marks: Number
});


const QuestionSetting = mongoose.model('QuestionSetting', questionSettingSchema)

module.exports = QuestionSetting;