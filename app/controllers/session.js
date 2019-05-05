const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const User = require('../models/user');
const util = require('../utils/util');

exports.authenticate = function (req, res) {
    let { login, password } = req.body;
    User.authenticate({ login, password }).then(user => {
        if (!user)
            throw { name: "USER_NOT_FOUND" }
        return util.okResponse(res, 200, user);
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

function sendToken(req, res) {
    if (req.user) {
        res.json({
            user: req.user,
            jwt: req.token
        })
    } else {
        res.status(422).json({
            error: 'Could not create user'
        })
    }
}

