const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Book = require('./Book').schema;
const Chapter = require('./Chapter').schema;
const Subject = require('./Subject').schema;
const Class = require('./Class').schema;
const User = require('./User').schema;
const QuestionType = require('./QuestionType').schema;
const Section = require('./Section').schema;

const questionPaperSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    header: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Header'
    },
    footer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Footer'
    },
    school:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'School'
    },
    class: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Class'
    },
    subject: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Subject'
    },
    totalMarks: Number,
    instruction: String,
    duration: Number,
    books: [
        {type: mongoose.SchemaTypes.ObjectId, ref: Book}
    ],
    sections: [
        {
            type: mongoose.SchemaTypes.ObjectId, ref: Section
        }
    ],
    createdDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    },
    title:{
        type: mongoose.SchemaTypes.String,
        required: true
    }
})


const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema)

module.exports = QuestionPaper;