const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: false,
        minlength: 3
    },
    description: {
        type: String,
        required: false,
        unique: false,
        trim: false,
        minlength: 3
    },
    audience: {
        type: String,
        required: false,
        unique: false,
        trim: false,
        minlength: 3
    },
    backlog: {
        type: [{
            task: String, 
            priority: Number,
            completed: Boolean
        }],
        required: false,
        unique: false,
        trim: false,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;