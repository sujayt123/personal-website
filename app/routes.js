var req = require('request'),
    fs = require('fs'),
    mongoose = require('mongoose');

fs.readdirSync(__dirname + "/models").forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
})

mongoose.connect('mongodb://username:password@ds033307.mlab.com:33307/website-db', function(error){
    if (error) {
        console.log("Mongoose encountered an error in connecting to the database.");
    }
    else {
        console.log("Mongoose connected to the db!")
    }
})

exports.setup = function (app) {
    app.get('/pocketReads', getPocketReads);

    app.get('/tablaDocs', getTablaDocs);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
}

function getPocketReads(request, response) {
    req({
            url: "https://goo.gl/ClX7uQ"
            , method: 'GET'
        }, function (err, res, body) {
              if (!err && res.statusCode == 200) {
                    body = JSON.parse(body);
                    console.log(body);
                    console.log(typeof(body));
                    response.json(body);
              }
        });
}

function getTablaDocs(request, response) {
    var queryObject = request.query;
    console.log(queryObject);
    mongoose.model('tabladocs').find(queryObject).exec(function(err, tablaDocs) {
        response.send(tablaDocs);
    })
}