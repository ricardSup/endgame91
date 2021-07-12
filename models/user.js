const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);