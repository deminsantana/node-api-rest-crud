const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 1,
        max: 100
    },
    name: String,
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)