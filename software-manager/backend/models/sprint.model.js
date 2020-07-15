const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sprintSchema = new Schema({
    task: {
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

const Sprint = mongoose.model('ProSprintject', sprintSchema);

module.exports = Sprint;