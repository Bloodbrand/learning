var util = require("./../util");

var Minion = function() {
    this.Name = util.randomName();
    this.Hp = util.randomNumber(10);
    this.Damage = util.randomNumber(10);
    this.Alive = true;
    this.Hit = 50;
    
    this.checkHit = function(){
        var hit = util.randomNumber(100);
        
        if(hit <= this.Hit)
            return true;
        else 
            return false;
    };
    
    this.Attack = function(minion){
        var damage = 0;
        
        console.log(this.Name + " --------> " + minion.Name); 
        
        if(this.checkHit()){
            damage = util.randomNumber(this.Damage);
        }
        else {
            console.log(this.Name + " missed!");
        }
        
        minion.TakeDamage(damage, this);    
    };
    
    this.TakeDamage = function(damage, attacker) {
        this.Hp -= damage; 
        console.log(this.Name + " takes " + damage + " damage from " + attacker.Name + "."); 
        
        if (this.Hp <= 0){
            this.Hp = 0;
            this.Die(); 
        }            
        else {            
            console.log(this.Name + " has " + this.Hp + " hp."); 
            console.log("_____________________________________"); 
            this.Attack(attacker); 
        }
    };
    
    this.Die = function(){
        console.log(this.Name + " has died!"); 
        this.Alive = false;   
    };
};

module.exports = Minion;
