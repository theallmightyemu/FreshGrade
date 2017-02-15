/*
@title: Fresh Grade Tech Test
@date: 2017-02-10
@author: Deryk Schneider
@contact: deryk.schneider@gmail.com
@notes: source on git, summary in README.md

This is my first ever node express project and it was really interesting.
I'm impressed with how little code is required to get a (practically) full REST API working.
This REST API supports GET, PUSH, and DELETE.
This product could easily and logically support PUT and PATCH REST endpoints.
This product could also include data metrics endpoints for creating log entries and dumping log reports.
This product could also include internal monitoring for potential abuses or malicious traffic.
*/
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser')


// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Credentials', true); // True to support cookies
    next();
});

// Load api data in json array's
app.use(bodyParser.json())

// Load routing
require('./routes')(app);

// We will be serving port 80 like content so listen on port xx80.
app.listen(9980);

// Console will print the message
console.log('Deryk Schneider Fresh Grade REST Server running at http://127.0.0.1:9980/');
