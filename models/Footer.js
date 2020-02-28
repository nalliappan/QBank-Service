const mongoose = require('mongoose')

const footerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subTitle: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    image:{
        type: String,
        required: true
    }
})


const Footer = mongoose.model('Footer', footerSchema)

module.exports = Footer;