

const ServicesModel= require('./models/service');
const CompaniesModel= require('./models/company');

const models = {};
models.Services = ServicesModel;
models.Companies = CompaniesModel;

module.exports = models;