class Character{
    name: string;
    health: number;
    power: number;
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
        this.health -= amount;
        this.logAction(this.name + " takes " + amount + " damage.");
        if(this.health <= 0) {
            this.health = 0;
            this.die();
            return;
        }

        if(attacker.alive)this.attack(attacker);
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
var spider = new Enemy("Spider", 20, 10, 5, player);

player.speak("Hello!");
player.addGold(15);
player.attack(spider);