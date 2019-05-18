const mongoose = require('mongoose');
const CompanySchema = require('../schemas/company');
const uploader = require('./uploader');

CompanySchema.methods.updateImage = function (path, imageType) {
    // Primero subir la imagen
    //console.log("update");
    
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

CompanySchema.methods.saveImageUrl = function (secureUrl, imageType) {
    //console.log("saveImageUrl");
    
    this[imageType + '_image'] = secureUrl;
    return this.save();
}

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;