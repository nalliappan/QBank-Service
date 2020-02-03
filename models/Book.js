const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Chapter = require('./Chapter').schema;
const Class = require('./Class').schema;

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    chapters: [{type: mongoose.Types.ObjectId, ref: Chapter}],
    class: [{
        type : mongoose.Types.ObjectId,
        ref : Class
    }]
})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book;