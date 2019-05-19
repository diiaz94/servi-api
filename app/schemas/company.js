const mongoose = require('mongoose');

let companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    phones: String,
    verified: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    location: {
        address: String,
        latitude: String,
        longitude: String
    },
    thumbnail_image: String,
    avatar_image: String,
    categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

companySchema.index({ '$**': 'text' });

module.exports = companySchema