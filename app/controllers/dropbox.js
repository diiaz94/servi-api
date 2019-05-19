const Dropbox = require('dropbox');
const secrets = require('../../config/secrets');
const util = require('../utils/util');
const multer = require('multer');
const CTS = require('../utils/constants');

exports.upload = function (req, res) {


	let upload = multer().single('file');

	upload(req, res, function (err) {


		let file = req.file;
		if (!file) {
			console.log("not file");

			return util.errorResponse(res, { name: 'MISSING_REQUIRED_FIELDS' });
		}

		console.log("AAAA", file);
		let image = file.buffer;

		let ext = (req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]).toUpperCase();
		console.log("Extension recibida: " + ext);
		//if (CTS.ACCEPTED_EXTENSIONS.indexOf(ext.toUpperCase()) == -1) return util.errorResponse(res, 'UNSUPPORTED_EXTENSIONS');
		if (image.length > CTS.MAX_FILE_SIZE) return util.errorResponse(res, 'FILE_TOO_LARGE');

		if (err) {
			res.json(err);
		}
		let filename = util.getObjectIdMongo() + '.' + ext;
		let dbx = new Dropbox({
			accessToken: secrets.dropbox.key
		});
		dbx.filesUpload({
			path: CTS.DROPBOX_FOLDER_PATH + "/" + filename,
			contents: image,
			mode: 'overwrite'
		})
			.then(function (response) {
				return util.okResponse(res, 201, {
					url: CTS.DROPBOX_FOLDER_PATH + "/" + filename,
					name: filename,
					message: 'Upload file successfully.'

				});
			})
			.catch(function (error) {
				console.log(error);
				util.errorResponse(res, { name: "INTERNAL_ERROR", extra: error });
			});
	});
}


exports.download = function (req, res) {

	var name = req.params.name;
	if (!name) {
		util.errorResponse(res, { name: "MISSING_REQUIRED_FIELDS" });
	}
	var dbx = new Dropbox({
		accessToken: secrets.dropbox.key
	});
	dbx.filesDownload({
		path: CTS.DROPBOX_FOLDER_PATH + "/" + name,
	})
		.then(function (response) {
			res.end(response.fileBinary, 'binary');
		})
		.catch(function (error) {
			res.status(404).end('File not found');
		});

}