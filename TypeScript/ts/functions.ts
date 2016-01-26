/***********named function***********/
  function log(msg: string){
      var para = document.createElement("h2");
      var content = document.createTextNode(msg);
      para.appendChild(content);
      document.getElementById('text').appendChild(para);
  }

/***********anonymous function***********/
  var add = function(x: number, y: number) : number{
    return x + y;
  }
  //log(add(3, 5).toString());

/***********lambda function***********/
  var $ = (id) => document.getElementById(id);

  /*
  same as:
  var $ = function(id){ return document.getElementById(id); }
  */

/***********function inside class***********/
  class Calc{
    add(x: number, y: number) : number { return x + y; } //returns number
  }

/***********optional params***********/
  function optionalParam(mandatory: string, optional?: string){
    log(mandatory + " " + optional);
  }
  //optionalParam("Radu"); //"Radu undefined"
  //optionalParam("Radu", "Milici");

/***********default params***********/
  function defaultParam(mandatory: string, _default = "Milici"){
    log(mandatory + " " + _default);
  }
  //defaultParam("Radu"); //"Radu Milici"
  //defaultParam("Radu", "Cavalera"); //"Radu Cavalera"

/***********rest params***********/
  function restParams(mandatory: string, ...rest: string[]){
    log(mandatory + " " + rest.join(" "));
  }
  //restParams("Radu", "param1", "param2", "param3"); //"Radu param1 param2 param3"
