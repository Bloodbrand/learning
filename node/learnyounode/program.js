var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = process.argv[2];

var server = http.createServer(callback);

function callback(req, res) {
    if(req.method !== "GET"){
        return;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    var parsed = url.parse(req.url, true);
    if(parsed.pathname.indexOf("parsetime") != -1){
        var d = new Date(parsed.query.iso);
        var jsonResp = {
            "hour": d.getHours(),
            "minute": d.getMinutes(),
            "second": d.getSeconds()  
        };
        res.end(JSON.stringify(jsonResp));
    }
    else if (parsed.pathname.indexOf("unixtime") != -1){
        var da = new Date(parsed.query.iso);
        res.end(JSON.stringify({"unixtime":da.getTime()}));
    }    
}

server.listen(port);