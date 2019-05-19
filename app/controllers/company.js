const upload = require('../../config/upload');
const Company = require('../models/company');
const helpers = require('./helpers');

const util = require('../utils/util');

exports.search = (req, res, next) => {

    let { text, category } = req.query || {};

    console.log(text);
    let regex = '.*' + text.replace(/ /g, '.*') + '.*';
    Company.find({
        name: {
            $regex: regex,
            $options: 'im'
        },
        categories: category,
        visible: true
    }, (e, result) => {
        if (e) {
            console.log(e.message);
            return util.errorResponse(res, e);
        } else {
            return util.okResponse(res, 200, result);
        }
    });
}