//const
enum Species { Human, Dog, Reaper }

interface Being{
    name: string[] | string;
    age: number;
    species: Species;
}

class Friend implements Being{
    constructor(public name: string[] | string,
                public age: number,
                public species: Species){

    };

    sayName() : void{
          console.log("My name is " + this.name);
    }

    returnAge() : number{
      return this.age;
    }
}

class Dog extends Friend{
    sayName() : void{
          console.log("woof!");
    }
}

var Radu = new Friend(["Radu", "Valentin", "Milici"], 26, Species.Human);
var Dragonu = new Friend(["Dragonu", "AK47"], 31, Species.Human);
var Nazara = new Friend("Nazara", 1e10, Species.Reaper);
var Laika = new Dog("Laika", 4, Species.Dog);
Dragonu.sayName();
console.log(Dragonu.returnAge());
Laika.sayName();
