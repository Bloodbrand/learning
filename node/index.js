var fs = require("fs"),
    path = require("path");
    
var directory = "./documents";

fs.readdir(directory, function(err, files){
    if(err){
        console.log(err);
        return;
    }
    
    for (var f = 0; f < files.length; f++) {
        var file = files[f];
        console.log(file);     
        
        var fileBuffer = fs.readFileSync(path.join(directory, file));
        console.log(fileBuffer.toString());
    }  
               
});


