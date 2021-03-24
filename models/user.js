const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const userSchema = new Schema (
    {    
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: String,
    tasks: [{
        type: Schema.Types.ObjectId, 
        ref: 'Task'
    }],
    lastActive: Date
    },
    {
    timestamps: true,
    collection: 'users'
    }

)

const User = mongoose.model('User', userSchema);

module.exports = User