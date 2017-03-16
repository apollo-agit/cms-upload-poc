var AlfrescoApi = require('alfresco-js-api');
var serverconfig = require('./server.config');

var alfrescoJsApi = new AlfrescoApi(serverconfig.cmshost);
var fs = require('fs');

CmsApi = function(cms, creds) {

    this.cms = cms;
    this.creds = creds;

    this.login = function() {
        this.cms.login(this.creds.user, this.creds.passwd).then(function(data) {
            console.log('API called successfully Login ticket:' + data);
        }, function(error) {
            console.error(error);
        });
    }

    this.upload = function(path, fname, type, cmsfolder) {
     	var fileToUpload = fs.createReadStream('./' + path);

    	this.cms.upload.uploadFile(fileToUpload, serverconfig.folder, null, null, {filename: fname})
	    .then(function () {
	        console.log('File ' + filename + ' Uploaded to ' + cmsfolder);
	    }, function (error) {
	        console.log('Error during the upload' + error);
	    });
    }

}

module.exports = new CmsApi(alfrescoJsApi, serverconfig.cmscreds);
