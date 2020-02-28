const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const questionTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    },
    mark: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String
    }
})


const QuestionType = mongoose.model('QuestionType', questionTypeSchema)

module.exports = QuestionType;