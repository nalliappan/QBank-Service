const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const subjectSchema = mongoose.Schema({
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
    description: {
        type: String
    }
})


const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject;