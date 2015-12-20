var squared = x => x * x;
//log(squared(4));

var test = {
  name: "Radu"
  ,
	handleMessage: function (message, handler) {
		handler(message);
	}
	,
	receive_Old: function () {//old way
		var that = this;//get scope
    this.handleMessage("hello ", function (message) {
      log(message + that.name);//here 'this' would point to Window
    })
	}
  ,
	receive_New: function () {//new way
    this.handleMessage("hello ", (message) => {
      log(message + this.name);//'this' now points to 'test' object
    })
	}
};

//test.receive_New();
