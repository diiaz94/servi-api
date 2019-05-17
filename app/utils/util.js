let CTS = require('./constants'),
    fs = require('fs'),
    _ = require('underscore'),
    moment = require('moment'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main').get(process.env.NODE_ENV)

const secrets = require('../../config/secrets');


exports.okResponse = (res, httpCode, data) => {
    return res.status(httpCode).json(
        { error: false, message: "", data }
    )
}
exports.errorResponse = (res, data) => {

    let { name, extra } = data;
    let error = CTS.ERRORS[name] || CTS.DEFAULT_ERROR;

    return res.status(error.httpCode).json({
        error: true,
        message: error.description,
        data: {
            name,
            code: error.code,
            description: error.description,
            extra: extra
        }
    })
}

exports.generateToken = (doc, expiresIn) => {

    return jwt.sign(doc, secrets.jwtSecret, {
        expiresIn: expiresIn
    });
}