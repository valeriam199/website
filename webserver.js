const http = require('http');
const fs = require('fs');
const timestamp = require('time-stamp');

const server = http.createServer(function (request, response){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Hello World");
    res.end();
}).listen(3344);
