const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sprintSchema = new Schema({
    projectId: {
        type: String,
        required: true,
        unique: true,
        trim: false,
        minlength: 3
    },
    backlog: {
        type: [{
            task: String, 
            priority: Number
        }],
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
    startDate: {
        type: Date,
        required: true,
        unique: false,
        trim: false,
    },
    endDate: {
        type: Date,
        required: true,
        unique: false,
        trim: false,
    },
}, {
    timestamps: true,
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;