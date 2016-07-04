const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');

const api = new ParseServer({
  databaseURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
});

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
      appId: process.env.APP_ID || 'myAppId',
      masterKey: process.env.MASTER_KEY || 'myMasterKey',
      appName: process.env.APP_NAME || 'myApp',
    },
  ]
}, true); // allow insecure

const app = express();

const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);
app.use('/dashboard', dashboard);

app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website!');
});

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('parse backend running on port ' + port + '.');
});
