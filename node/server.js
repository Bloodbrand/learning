var http = require("http"),
    querystring = require("querystring"),
    fs = require("fs"),
    path = require("path"),
    url = require("url");
    
var directory = "./documents";  
var invalidFileRegex = /^[.\/\\]|\.\./;  
    
var server = http.createServer(function(req, res){
    var query = url.parse(req.url, true).query;
    writeIndex(req, res);
});

function writeIndex(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    
    fs.readdir(directory, function(err, files){
       if(err){
           res.end(err);
           return;
       } 
       
       var fileListHTML = "";
       
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            fileListHTML += `
                <li><a href="?file=${file}">${file}</a></li>
            `;
        }
               
       res.end(`
        <ul>
            ${fileListHTML}
        </ul>
        
        <form method="POST">
            <input type="text" name="file"/>
            <textarea name="text"></textarea>
            <input type="submit"/>
        </form>
       `);
    });
}

function writeText(res, status, text) {
    res.writeHead(status, {"Content-Type": "text/plain"});
    res.end(text);
}

server.listen(4000);