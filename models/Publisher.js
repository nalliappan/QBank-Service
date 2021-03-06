const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./User').schema;

const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    address1: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    phone: {
        type: String
    },
    description: {
        type: String
    },
    users:[
        {type: mongoose.Schema.Types.ObjectId, ref: User}
    ]
})


const Publisher = mongoose.model('Publisher', publisherSchema)

module.exports = Publisher;