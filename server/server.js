/*
 * POC for Upload
 * Server JS
 * Basic server entry for all web and service requests
 *
 * @license Apollo Global, Inc. V 1.0
 *
 * Apollo Global, Inc.
 * License MIT
 */

var config = require('./server.config');
express = require('express');
var app = express();
bodyParser = require('body-parser');
app.use(bodyParser.json());

var alfrescoJsApi = require('./cms-client');
alfrescoJsApi.login();

var port = process.env.PORT || config.serverport;

app.use(express.static(__dirname + '/../public'));
var apiRouter = require('./api-router');
app.use(apiRouter);


app.listen(port);
console.log('Magic happens on port ' + port + ' ' + __dirname + '/../public');
module.exports = app;
