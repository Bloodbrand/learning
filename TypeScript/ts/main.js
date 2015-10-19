var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Character = (function () {
    function Character(name, health, power) {
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
        this.health -= amount;
        this.logAction(this.name + " takes " + amount + " damage.");
        if (this.health <= 0) {
            this.health = 0;
            this.die();
            return;
        }
        if (attacker.alive)
            this.attack(attacker);
    };
    Character.prototype.die = function () {
        this.alive = false;
        this.logAction(this.name + " has died!");
    };
    Character.prototype.logAction = function (message) {
        var para = document.createElement("p");
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
        _super.prototype.logAction.call(this, player.name + " has looted " + this.goldReward + " gold from " + this.name + ".");
        this.player.addGold(this.goldReward);
    };
    return Enemy;
})(Character);
var player = new Player("Radu", 100, 7);
var spider = new Enemy("Spider", 20, 10, 5, player);
player.speak("Hello!");
player.addGold(15);
player.attack(spider);
//# sourceMappingURL=main.js.map