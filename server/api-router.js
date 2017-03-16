express = require('express');
var serverconfig = require('./server.config');
var multer  = require('multer')
var upload = multer({dest: serverconfig.filedir});
var apiRouter = express.Router(); 
var alfrescoJsApi = require('./cms-client');

var db = require('node-localdb');
var filedb = db(serverconfig.dbdir + 'file.json');
var FileEnity = require('./file-entity');

apiRouter.route('/upload') 
	.post(upload.single('file'), function(req, res) {
		fileEntity = new FileEntity(req, serverconfig);
		filedb.insert(fileEntity);

		console.log(req.file);
		console.log(req.body.filetype);

		alfrescoJsApi.upload(req.file.path, req.file.originalname, req.body.type, '');
	})
	.get(function(req, res) {
		console.log('get upload called');
		filedb.find({}).then(function(data){
			res.json(data);
		});
	});

module.exports = apiRouter;