const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const taskSchema = new Schema (
    {
        title: String,
        description: String,
        dueDate: Date
    }
)

const Task = mongoose.model('Task', taskSchema);

module.exports = Task