express = require('express');
var serverconfig = require('./server.config');
var multer  = require('multer');
var apiRouter = express.Router(); 
var alfrescoJsApi = require('./cms-client');
var fs = require('fs');

var db = require('node-localdb');
var filedb = db(serverconfig.dbdir + 'file.json');
var FileEnity = require('./file-entity');



var storage = multer.diskStorage({
  destination: serverconfig.filedir,
  filename: function (req, file, cb) {
  	console.log(file);
    cb(null, serverconfig.user_first_name + serverconfig.user_last_name + '-' + Date.now() + '-' + file.originalname);
  }
})

var upload = multer({ storage: storage })

apiRouter.route('/upload') 
	.post(upload.single('file'), function(req, res) {
		fileEntity = new FileEntity(req, serverconfig);
		filedb.insert(fileEntity);
		alfrescoJsApi.upload(req.file.path, req.file.originalname, req.body.type, '');
	})
	.get(function(req, res) {
		console.log('get upload called');
		filedb.find({}).then(function(data){
			res.json(data);
		});
	});

module.exports = apiRouter;