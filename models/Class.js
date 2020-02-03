const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true
    },
    board: {
        type: String
    }
})


const Class = mongoose.model('Class', classSchema)

module.exports = Class;