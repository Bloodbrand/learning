//module export
var mod = (function(){
    var ret = {};

    ret.log1 = function(){
        console.log("log 1");
    };

    return ret;
}());

//augmentation pattern
(function(ret){
    ret.log2 = function(){
        console.log("log 2");
    };

    return ret;
}(mod));

//tight augmentation, with override
(function(ret){
    var oldLog2 = ret.log2;

    ret.log2 = function(){
        console.log("new log 2");
    };

    return ret;
}(mod));

//sub-module
mod.sub = (function(){
    var ret = {};

    ret.subLog = function(){
        console.log("sub log");
    };

    return ret;
}());