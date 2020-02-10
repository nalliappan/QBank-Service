const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Chapter = require('../models/Chapter');
const Question = require('../models/Question');
const QuestionSetting = require('../models/QuestionSetting');

const sectionSchema = mongoose.Schema({
    chapters: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: Chapter
    }],
    settings:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: QuestionSetting
        }
    ],
    assignedQuestions: [{type: mongoose.SchemaTypes.ObjectId, ref: Question}],
    instruction: String
})


const Class = mongoose.model('Section', sectionSchema)

module.exports = Class;