var http = require('http'),
    fs = require('fs'),
    connect = require('connect'),
    serveStatic = require('serve-static');

const PORT=8080;

connect().use(serveStatic(__dirname)).listen(PORT, function(){
    console.log('Server running on '+PORT+'...');
});