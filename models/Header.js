const mongoose = require('mongoose')

const headerSchema = mongoose.Schema({
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


const Header = mongoose.model('Header', headerSchema)

module.exports = Header;