const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    number: {
        type: String,
        unique: true
    },

    role: {
        type: String,
        default: "user",
        enum: ['admin', 'user']
    }

})

module.exports = mongoose.model('User', userSchema);
