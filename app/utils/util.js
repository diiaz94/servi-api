let CTS = require('./constants'),
    fs = require('fs'),
    _ = require('underscore'),
    moment = require('moment'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main').get(process.env.NODE_ENV)
const SECRET = config.secret;


exports.okResponse = (res, httpCode, response) => {
    return res.status(httpCode).json(
        response
    )
}
exports.errorResponse = (res, data) => {
    
    console.log("err", data);

    let { name, extra } = data;
    let error = CTS.ERRORS[name] || CTS.DEFAULT_ERROR;

    return res.status(error.httpCode).json({
        error: {
            name,
            code: error.code,
            description: error.description,
            extra: extra
        }
    })
}

exports.generateToken = (doc, expiresIn) => {

    return jwt.sign(doc, SECRET, {
        expiresIn: expiresIn
    });
}