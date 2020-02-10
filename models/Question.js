const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Book = require('./Book').schema;
const Chapter = require('./Chapter').schema;
const Subject = require('./Subject').schema;
//const Chapter = require('./Chapter').schema;
const Class = require('./Class').schema;
const QuestionType = require('./QuestionType').schema;

const questionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    questionTypeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: QuestionType,
        required: true
    }],
    subjectId: [{
        type: mongoose.Types.ObjectId,
        ref: Subject,
        required: true
    }],
    classId: [{
        type: mongoose.Types.ObjectId,
        ref: Class,
        required: true
    }],
    bookId: [{
        type: mongoose.Types.ObjectId,
        ref: Book,
        required: true
    }],
    chapterId: [{
        type: mongoose.Types.ObjectId,
        ref: Chapter,
        required: true
    }],
    answers: [{type: String}],
    instruction: String,
    questionImage: String,
    questionMark: Number
})


const Question = mongoose.model('Question', questionSchema)

module.exports = Question;