var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//const
var Species;
(function (Species) {
    Species[Species["Human"] = 0] = "Human";
    Species[Species["Dog"] = 1] = "Dog";
    Species[Species["Reaper"] = 2] = "Reaper";
})(Species || (Species = {}));
var Friend = (function () {
    function Friend(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    ;
    Friend.prototype.sayName = function () {
        console.log("My name is " + this.name);
    };
    Friend.prototype.returnAge = function () {
        return this.age;
    };
    return Friend;
})();
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        _super.apply(this, arguments);
    }
    Dog.prototype.sayName = function () {
        console.log("woof!");
    };
    return Dog;
})(Friend);
var Radu = new Friend(["Radu", "Valentin", "Milici"], 26, Species.Human);
var Dragonu = new Friend(["Dragonu", "AK47"], 31, Species.Human);
var Nazara = new Friend("Nazara", 1e10, Species.Reaper);
var Laika = new Dog("Laika", 4, Species.Dog);
Dragonu.sayName();
console.log(Dragonu.returnAge());
Laika.sayName();
