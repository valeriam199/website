const http = require('http');
const fs = require('fs');
const timestamp = require('time-stamp');

const server = http.createServer(function (request, response){
    if(request.method === "POST" && request.url==="/export"){
        console.log("Korrekte Anfrage!---------------------------")
        let daten = '';
        request.on('data', function(chunk){
            daten += chunk;
        });

        request.on('end', function(){
            const filename = "export_" + timestamp('YYYYMMDDHHmmss') + ".json";
            fs.writeFile(filename, daten, function(err){
                if(err){
                    return console.error(err);
                }
                console.log("Die Datei wurde exportiert unter " + filename);
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end("Die Datei wurde exportiert unter" + filename);
            });
        });
    } else{
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end("Fehler: Falsche Anfrage");
    }
}).listen(8081);
console.log("Der Webserver ist erreichbar unter http://127.0.0.1:8081/");

setTimeout(function(){
    const testDaten = '{"name":"Test"}';

    const req = http.request({
        hostname: '127.0.0.1',
        port: 8081,
        path: '/export',
        method: 'POST',

    });
    req.write(testDaten);
    req.end()
});



   
