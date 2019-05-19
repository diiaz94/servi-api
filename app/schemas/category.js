const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = categorySchema