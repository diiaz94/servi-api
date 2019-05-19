const upload = require('../../config/upload');
const Company = require('../models/company');
const helpers = require('./helpers');

const util = require('../utils/util');

exports.search = (req, res, next) => {

    let { text, category } = req.query || {};

    if (!text) return util.errorResponse(res, {name:"MISSING_REQUIRED_FIELDS"});

    let regex = '.*' + text.replace(/ /g, '.*') + '.*';
    let match = {
        name: {
            $regex: regex,
            $options: 'im'
        },
        visible: true
    };
    if (category) match.categories = category;
    Company.find(match, (e, result) => {
        if (e) {
            console.log(e.message);
            return util.errorResponse(res, e);
        } else {
            return util.okResponse(res, 200, result);
        }
    });
}