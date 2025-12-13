const http = require('http');
const fs = require('fs');
const timestamp = require('time-stamp');

const exportfolder = './exports';
if (!fs.existsSync(exportfolder)) {
    fs.mkdirSync(exportfolder);
}

const server = http.createServer(function (request, response){
    if(request.method === "POST" && request.url==="/export"){
        console.log("Korrekte Anfrage!---------------------------")
        let daten = '';
        request.on('data', function(chunk){
            daten += chunk;
        });

        request.on('end', function(){
            const filename = exportfolder + "/export_" + timestamp('YYYYMMDDHHmmss') + ".json";
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




   
