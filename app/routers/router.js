const express = require('express');
const sessionController = require('../controllers/session');
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


    app.use('/v1/services', crud(models.Services));
    app.use('/v1', apiRoutes);
}