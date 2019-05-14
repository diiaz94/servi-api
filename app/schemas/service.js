const mongoose = require('mongoose');

let serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    phone: String,
    verified: Boolean,
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

serviceSchema.methods.updateImage = function (path, imageType) {
    // Primero subir la imagen
    // Guardar el lugar
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

serviceSchema.methods.saveImageUrl = function (secureUrl, imageType) {
    this[imageType + '_image'] = secureUrl;
    return this.save();
}

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service