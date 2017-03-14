express = require('express');
var serverconfig = require('./server.config');
var multer  = require('multer')
var upload = multer({dest: serverconfig.filedir});
var apiRouter = express.Router(); 
var alfrescoJsApi = require('./cms-client');

apiRouter.route('/upload') 
	.post(upload.single('file'), function(req, res) {
		console.log(req.file);
		console.log(req.body.filetype);

		alfrescoJsApi.upload(req.file.path, req.file.originalname, req.body.type, '');
	});

module.exports = apiRouter;