"use strict";
function* greet1(){
  log("called 'next'");
}
/***next***/
function testGreet_1() {
  let greeter = greet1();
  log(greeter);//generator object
  let next = greeter.next();//logs "called 'next'"
  log(next);//{value: undefined, done: true} because no yield
}
//testGreet_1();

/***single yield***/
function* greet2(){
  log("called 'next'");
  yield "hello";
}

function testGreet_2() {
  let greeter = greet2();
  log(greeter);//generator object
  let next = greeter.next();//logs "called 'next'"
  log(next);//{value: "hello", done: false} because of yield
  let done = greeter.next();//logs "called 'next'"
  log(done);// {value: undefined, done: true}
}
//testGreet_2();

/***multiple yields***/
function* greet3(){
  let that = this;
  log("called 'next' 1 time");
  log("also logs this");
  yield "1";
  log("called 'next' 2 times");
  yield "2";
  log("called 'next' 3 times");
  yield "3";
  log("called 'next' 4 times");
  yield "4";
}

function testGreet_3() {
  let greeter = greet3();
  let next1 = greeter.next();//logs "called 'next' 1 time" and "also logs this"
  log(next1);//{value: "1", done: false}

  let next2 = greeter.next();//logs "called 'next' 2 times"
  log(next2);//{value: "2", done: false}

  let next3 = greeter.next();//logs "called 'next' 3 times"
  log(next3);//{value: "3", done: false}

  let next4 = greeter.next();//logs "called 'next' 4 times"
  log(next4);//{value: "4", done: false}

  let next5 = greeter.next();
  log(next5);//{value: undefined, done: true}
}
//testGreet_3();

/***multiple yields***/
function* infiniteYield() {
  let x = 0;
  let y = 0;

  while(true){
    yield {x, y};//ecma6 object: same as {x: x, y: y}
    x += 2;
    y += 3;
  }
}

function testInfiniteYield(loops) {
  let i = 0;
  var loopGenerator = infiniteYield();

  while(i < loops){
    log(loopGenerator.next().value);//does not cause an infinite loop, generator yield pauses
    i++;
  }
}

testInfiniteYield(10);
