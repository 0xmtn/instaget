#! /usr/bin/env node
/*
 * instaget
 * https://github.com/0xmtn/instaget
 *
 * Copyright (c) 2016 Metin Emenullahi
 * Licensed under the MIT license.
 */

'use strict';

var config = require("./config");
var _INSTAPI = require("instagram-node-lib");
var readline = require("readline");
var request = require("request");


var _RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var _CLIENT_ID = config.client_id;
var _CLIENT_SECRET = config.client_secret;
var _RED_URI = config.redirect_uri;

_INSTAPI.set('client_id', _CLIENT_ID);
_INSTAPI.set('client_secret', _CLIENT_SECRET);


RL.question("Type your access token please: ", function(ans){
  var _ACCESS_TOK = ans;
  _INSTAPI.set("access_token", _ACCESS_TOK);
  _INSTAPI.tags.search({q: "notredame", complete: function(media){
    console.log(media);
  }}); 
});



