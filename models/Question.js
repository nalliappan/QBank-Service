const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Chapter = require('./Book').schema;
const Chapter = require('./Chapter').schema;
const Chapter = require('./Chapter').schema;
const Class = require('./Class').schema;
const QuestionType = require('./QuestionType').schema;

const questionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    questionType: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: QuestionType,
        required: true
    },
    subject: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Subject,
        required: true
    },
    class: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Class,
        required: true
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Book,
        required: true
    },
    chapter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Chapter,
        required: true
    },
    answers: [{type: String}]
})


const Question = mongoose.model('Question', questionSchema)

module.exports = Question;