const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const backlogSchema = new Schema({
    projectId: {
        type: String,
        required: true,
        unique: true,
        trim: false,
        minlength: 3
    },
    tasks: {
        type: [{
            task: String, 
            priority: Number,
            completed: Boolean,
        }],
        required: false,
        unique: false,
        trim: false,
        minlength: 3
    },

}, {
    timestamps: true,
});

const Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = Backlog;