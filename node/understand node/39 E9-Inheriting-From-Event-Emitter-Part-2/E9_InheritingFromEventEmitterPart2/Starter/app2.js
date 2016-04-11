function Enemy(){
    this.health = 10;
    this.name = "Enemy";
}

function Soldier(){
    Enemy.call(this);
    this.bullets = 100;
}

var a = new Soldier();
console.log(a);

