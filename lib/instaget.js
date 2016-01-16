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
var StringDecoder = require('string_decoder').StringDecoder;
var readline = require("readline");
var request = require("request");


var _RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var _DCDR = new StringDecoder("utf8");


var _CLIENT_ID = config.client_id;
var _CLIENT_SECRET = config.client_secret;
var _RED_URI = config.redirect_uri;

_INSTAPI.set('client_id', _CLIENT_ID);
_INSTAPI.set('client_secret', _CLIENT_SECRET);


_RL.question("Type your access token please: ", function(ans){
  var _ACCESS_TOK = ans;
  _INSTAPI.set("access_token", _ACCESS_TOK);
  var TAG_SEARCH = "https://api.instagram.com/v1/tags/search?q=notredame&access_token=47164245.162138e.b8efb47d7872469e999641f5859a9a84";
  var tag_search_resp = "";
  request.get(TAG_SEARCH).on("data", function(chunk){
    tag_search_resp += chunk;
  }).on("end", function(){
    tag_search_resp = _DCDR.write(tag_search_resp);
    tag_search_resp = JSON.parse(tag_search_resp);
    console.log(tag_search_resp);
  });

  var TAG_URL = "https://api.instagram.com/v1/tags/notredame/media/recent?access_token=47164245.162138e.b8efb47d7872469e999641f5859a9a84"
  var inst_resp = "";
  request.get(TAG_URL).on("data", function(chunk){
    inst_resp += chunk;
  }).on("end", function(){
    inst_resp = _DCDR.write(inst_resp);
    inst_resp = JSON.parse(inst_resp);
    console.log(inst_resp);
  });
  /*_INSTAPI.tags.recent({name: 'blue', complete: function(media){
    console.log(media);
  }});*/ 
});



