var obj = {
    name: "radu",
    greet: function(){
        console.log(`Hello ${this.name}`);
    }
};

obj.greet();