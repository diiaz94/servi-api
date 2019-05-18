const mongoose = require('mongoose');

let companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    phones: String,
    verified: { type: Boolean, default: false },
    location: {
        address: String,
        latitude: String,
        longitude: String
    },
    thumbnail_image: String,
    avatar_image: String,
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = companySchema