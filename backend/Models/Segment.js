const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rule_set: {
        type: Object,
        required: true,
        // Example structure:
        // {
        //     conditions: [{
        //         field: String,
        //         operator: String,
        //         value: Mixed
        //     }],
        //     combination: String // 'AND' or 'OR'
        // }
    },
    audience_size: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Segment', segmentSchema); 