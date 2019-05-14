const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const CTS = require('../utils/constants');
const User = require('../models/user');
const util = require('../utils/util');

exports.authenticate = function (req, res) {
    let { login, password } = req.body;
    User.authenticate({ login, password }).then(user => {
        if (!user)
            throw { name: "USER_NOT_FOUND" }
        delete user._doc.password;
        let response = { user };
        response.token = util.generateToken({ user: user._doc }, CTS.TOKEN_EXPIRES_IN);
        return util.okResponse(res, 200, response);
    }).catch(err => {
        return util.errorResponse(res, err);
    });

}

exports.create = function (req, res) {
    let { login, password } = req.body;
    User.create({ login, password }).then(user => {
        return util.okResponse(res, 200, user);
    }).catch(err => {
        return util.errorResponse(res, err);
    });

}


