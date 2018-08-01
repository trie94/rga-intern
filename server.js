var express = require('express');
var path = require('path');
var app = express();

app.use('/src', express.static(path.resolve(__dirname + '/src')));
app.use('/dist', express.static(path.resolve(__dirname + '/dist')));

console.log("server");