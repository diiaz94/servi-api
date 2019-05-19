

const ServicesModel= require('./models/service');
const CompaniesModel= require('./models/company')
const CategoriesModel= require('./models/category');;

const models = {};
models.Services = ServicesModel;
models.Companies = CompaniesModel;
models.Categories = CategoriesModel;

module.exports = models;