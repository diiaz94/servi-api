const express = require('express');
const sessionController = require('../controllers/session');
const companyController = require('../controllers/company');
const dropboxController = require('../controllers/dropbox');
const locationController = require('../controllers/location');
const models = require('../models');
const crud = require('../crud');
module.exports = (app) => {

    var apiRoutes = express.Router();


    apiRoutes.get('/', function (req, res) {
        res.json({
            message: 'Welcome to our api'
        });
    });


    apiRoutes.post('/login', sessionController.authenticate);
    apiRoutes.post('/signup', sessionController.create);
    apiRoutes.post('/upload', dropboxController.upload);
    apiRoutes.get('/resources/:name', dropboxController.download);

    apiRoutes.get('/states', locationController.states);
    apiRoutes.get('/cities', locationController.cities);
    apiRoutes.get('/zones', locationController.zones);

    /*  app.post('/v1/services',
          upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
          serviceController.create,
          serviceController.saveImage);*/
    //app.use('/v1/services', crud(models.Services));

    app.get('/v1/companies', companyController.all);
    app.use('/v1/companies', crud(models.Companies));
    app.use('/v1/categories', crud(models.Categories));


    app.use('/v1', apiRoutes);
}   