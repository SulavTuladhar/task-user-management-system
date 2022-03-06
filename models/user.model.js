const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number
    },
    address:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema);