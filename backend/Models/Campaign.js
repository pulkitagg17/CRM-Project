const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    segment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Segment',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message_template: {
        subject: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        variables: [{
            key: String,
            defaultValue: String
        }]
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SCHEDULED', 'RUNNING', 'COMPLETED', 'FAILED'],
        default: 'DRAFT'
    },
    ai_summary: {
        type: String
    },
    scheduled_time: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
