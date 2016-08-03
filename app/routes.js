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
    app.get('/tablaDocs/:key', getUniqueValuesForTablaDocsKey);

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
    mongoose.model('tabladocs').find(queryObject).exec(function(err, tablaDocs) {
        response.send({vals: tablaDocs});
    })
}

function getUniqueValuesForTablaDocsKey(request, response) {
    var key = request.params.key;
    // magic string 'db_keys' corresponds to a list of all keys in the collection's documents
    if (key === 'db_keys') {
        mongoose.model('tabladocs').findOne({}, function(err, doc) {
            response.send({ vals: Object.keys(doc.toJSON())
                                .filter(function(x) {return (x !== "_id" && x !== 'bols')})});
        });
    }
    // Otherwise, we want a list of all possible values for {key} in the collection's documents
    else {
        mongoose.model('tabladocs').distinct(key, function(err, values) {
            response.send({vals: values});
        })
    }
}