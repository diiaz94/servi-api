const Service = require('../models/service');
const upload = require('../config/upload');
const uploader = require('../models/uploader');
const helpers = require('./helpers');

const validParams = ['name', 'description', 'phone', 'location', 'thumbnail_image', 'avatar_image'];

exports.multerMiddleware = () => {
    return upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]);
}

exports.create = (req, res, next) => {
    const params = helpers.buildParams(validParams, req.body);
    console.log(req.user);
    params['_user'] = req.user.id;
    Place.create(params).then(doc => {
        req.place = doc;
        next();
    }).catch(err => {
        next(err);
    });
}

exports.saveImage = (req, res) => {
    if (req.place) {
        const files = ['avatar', 'thumbnail'];
        const promises = [];

        files.forEach(imageType => {
            if (req.files && req.files[imageType]) {
                const path = req.files[imageType][0].path;
                promises.push(req.place.updateImage(path, imageType));
            }
        })

        Promise.all(promises).then(results => {
            console.log(results);
            res.json(req.place);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });


    } else {
        res.status(422).json({
            error: req.error || 'Could not save place'
        });
    }
}