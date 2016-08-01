var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    logger = require('morgan'),
    app = express();

app.use(logger('default'));
app.use(cors());
app.use(express.static(__dirname+'/public'))

app.use(bodyParser.json());

// Get the port from the environment for a remote server, else set to 8080 on local server
var port = process.env.PORT || 8080;

require('./app/routes.js').setup(app)

// Tells the server to listen on the provided port and log information about the server to the node terminal
var server = app.listen(port, function() {
    console.log('Server listening at http://%s:%s', server.address().address,
        server.address().port);
});