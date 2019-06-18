const upload = require('../../config/upload');
const Company = require('../models/company');
const helpers = require('./helpers');

const util = require('../utils/util');

exports.all = (req, res, next) => {

    let { text, category } = req.query || {};
    let match = req.query;
    delete match.category
    delete match.text
    if (!!text) {
        let regex = '.*' + text.replace(/ /g, '.*') + '.*';
        match.$or = [{
            name: {
                $regex: regex,
                $options: 'im'
            }
        }, {
            description: {
                $regex: regex,
                $options: 'im'
            }
        }, {
            "location.address": {
                $regex: regex,
                $options: 'im'
            }
      }];
    }
    match.visible = true;
    // return res.json(match)

    if (!!category) match.categories = category;
    Company.find(match, (e, result) => {
        if (e) {
            console.log(e.message);

            return util.errorResponse(res, e);
        } else {
            return util.okResponse(res, 200, { size: result.length, match, result });
        }
    });
}