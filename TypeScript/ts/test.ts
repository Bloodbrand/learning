class Item{
    itemName: string;
    itemPower: number;
    itemArmor: number;

    constructor(name: string, power: number, armor: number){
        this.itemName = name;
        this.itemPower = power;
        this.itemArmor = armor;
    }
}

class Character{
    name: string;
    health: number;
    armor: number = 0;
    power: number;
    items: Item[] = [];
    alive: boolean = true;
    div = document.getElementById('text');

    constructor(name: string, health: number, power: number){
        this.name = name;
        this.power = power;
        this.health = health;
    }

    speak(message: string){
        this.logAction(message);
    }

    showHealth(){
        this.logAction(this.name +"'s health is " + this.health + ".");
    }

    attack(target: Character){
        this.logAction(this.name + " attacks " + target.name + "!");
        target.takeDamage(this.power, this);
    }

    takeDamage(amount: number, attacker: Character){
        var damageTaken = amount - this.armor;
        if(damageTaken < 0) damageTaken = 0;

        this.health -= damageTaken;

        this.logAction(this.name + " takes " + damageTaken + " damage.");
        if(this.health <= 0) {
            this.health = 0;
            this.die();
            return;
        }
        this.logAction(this.name + " has " + this.health + " health remaining.");
        if(attacker.alive)this.attack(attacker);
    }

    lootItem(item: Item){
        this.items.push(item);
        this.power += item.itemPower;
        this.armor += item.itemArmor;
        this.logAction(this.name + " has looted " + item.itemName + ".");
    }

    die(){
        this.alive = false;
        this.logAction(this.name + " has died!");
    }

    logAction(message: string){
        var para = document.createElement("p");
        var content = document.createTextNode(message);
        para.appendChild(content);
        this.div.appendChild(para);
    }
}

class Player extends Character{
    gold: number = 0;

    speak(message: string){
        super.speak("Player " + this.name + " says: " + message);
    }

    die(){
        super.die();
        this.logAction("GAME OVER!");
    }

    addGold(amount: number){
        this.gold += amount;
        super.logAction(this.name + " has a total of " + this.gold + " gold.");
    }
}

class Enemy extends Character{
    goldReward: number;
    player: Player;

    constructor(name: string, health: number, gold: number, power: number, player: Player){
        super(name, health, power);
        this.goldReward = gold;
        this.player = player;
    }

    die(){
        super.die();
        this.giveGold();
    }

    giveGold(){
        super.logAction(player.name + " has looted " + this.goldReward + " gold from " + this.name + ".");
        this.player.addGold(this.goldReward);
    }
}

var player = new Player("Radu", 100, 7);
var silverSword = new Item("Silver sword", 3, 0);
var copperArmor = new Item("Copper armor", 0, 2);
player.lootItem(silverSword);
player.lootItem(copperArmor);
var spider = new Enemy("Spider", 20, 10, 5, player);

player.speak("Hello!");
player.addGold(15);
player.attack(spider);