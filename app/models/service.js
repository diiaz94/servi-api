const mongoose = require('mongoose');
const ServiceSchema = require('../schemas/service');
const uploader = require('./uploader');

ServiceSchema.methods.updateImage = function (path, imageType) {
    // Primero subir la imagen
    //console.log("update");
    
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

ServiceSchema.methods.saveImageUrl = function (secureUrl, imageType) {
    //console.log("saveImageUrl");
    
    this[imageType + '_image'] = secureUrl;
    return this.save();
}

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;