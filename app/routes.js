var req = require('request');

exports.setup = function (app) {
    app.get('/pocketReads', getPocketReads);

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