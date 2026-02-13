const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required']
    },
    last_name: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    user_type: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest'
    }

})

module.exports = mongoose.model('User', userSchema);