var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Item = (function () {
    function Item(name, power, armor) {
        this.itemName = name;
        this.itemPower = power;
        this.itemArmor = armor;
    }
    return Item;
})();
var Character = (function () {
    function Character(name, health, power) {
        this.armor = 0;
        this.items = [];
        this.alive = true;
        this.div = document.getElementById('text');
        this.name = name;
        this.power = power;
        this.health = health;
    }
    Character.prototype.speak = function (message) {
        this.logAction(message);
    };
    Character.prototype.showHealth = function () {
        this.logAction(this.name + "'s health is " + this.health + ".");
    };
    Character.prototype.attack = function (target) {
        this.logAction(this.name + " attacks " + target.name + "!");
        target.takeDamage(this.power, this);
    };
    Character.prototype.takeDamage = function (amount, attacker) {
        var damageTaken = amount - this.armor;
        if (damageTaken < 0)
            damageTaken = 0;
        this.health -= damageTaken;
        this.logAction(this.name + " takes " + damageTaken + " damage.");
        if (this.health <= 0) {
            this.health = 0;
            this.die();
            return;
        }
        this.logAction(this.name + " has " + this.health + " health remaining.");
        if (attacker.alive)
            this.attack(attacker);
    };
    Character.prototype.lootItem = function (item) {
        this.items.push(item);
        this.power += item.itemPower;
        this.armor += item.itemArmor;
        this.logAction(this.name + " has looted " + item.itemName + ".");
    };
    Character.prototype.die = function () {
        this.alive = false;
        this.logAction(this.name + " has died!");
    };
    Character.prototype.logAction = function (message) {
        var para = document.createElement("h2");
        var content = document.createTextNode(message);
        para.appendChild(content);
        this.div.appendChild(para);
    };
    return Character;
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.apply(this, arguments);
        this.gold = 0;
    }
    Player.prototype.speak = function (message) {
        _super.prototype.speak.call(this, "Player " + this.name + " says: " + message);
    };
    Player.prototype.die = function () {
        _super.prototype.die.call(this);
        this.logAction("GAME OVER!");
    };
    Player.prototype.addGold = function (amount) {
        this.gold += amount;
        _super.prototype.logAction.call(this, this.name + " has a total of " + this.gold + " gold.");
    };
    return Player;
})(Character);
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, health, gold, power, player) {
        _super.call(this, name, health, power);
        this.goldReward = gold;
        this.player = player;
    }
    Enemy.prototype.die = function () {
        _super.prototype.die.call(this);
        this.giveGold();
    };
    Enemy.prototype.giveGold = function () {
        _super.prototype.logAction.call(this, this.player.name + " has looted " + this.goldReward + " gold from " + this.name + ".");
        this.player.addGold(this.goldReward);
    };
    return Enemy;
})(Character);
var player = new Player("Radu", 100, 5);
var silverSword = new Item("silver sword", 3, 0);
var copperArmor = new Item("copper armor", 0, 2);
player.lootItem(silverSword);
player.lootItem(copperArmor);
var spider = new Enemy("Spider", 20, 10, 5, player);
player.speak("Hello!");
player.addGold(135);
player.addGold(15);
player.attack(spider);

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
