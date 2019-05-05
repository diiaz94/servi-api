let express = require('express');
let sessionController = require('../controllers/session');

module.exports = (app) => {

    var apiRoutes = express.Router();


    apiRoutes.get('/', function (req, res) {
        res.json({
            message: 'Welcome to our api'
        });
    });


    apiRoutes.post('/login', sessionController.authenticate);
    apiRoutes.post('/signup', sessionController.create);

    app.use('/v1', apiRoutes);
}