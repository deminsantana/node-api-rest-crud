let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/apicrud');

let UserDetailSchema = new mongoose.Schema({
    firtsname: String,
    lastname: String,
    dni: String,
    sex: String,
    phone: Number,
    status: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('UserDetail', UserDetailSchema)