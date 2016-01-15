var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();

app.set('port', 3000);
app.configure(function() {
  // The usual...
});

api.use({
  client_id: YOUR_CLIENT_ID,
  client_secret: YOUR_CLIENT_SECRET
});

var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Sheeeeiiiiit");
    } else {
      console.log('AT is: ' + result.access_token);
      res.send('Khapat, khardesim, khapat!');
    }
  });
};

app.get('/authorize_user', exports.authorize_user);
app.get('/handleauth', exports.handleauth);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
