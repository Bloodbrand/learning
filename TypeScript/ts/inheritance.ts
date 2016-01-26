/***********calling a base class using 'super'***********/
  class BaseClass{
    private _title : string;
    constructor(title : string){
      this._title = title;
    }
  }

  class ExtendsClass extends BaseClass{
    constructor(title : string){
      super(title);
    }
  }
  //var test = new ExtendsClass("new ExtendsClass");

/***********overloads***********/
  class Plant{
    constructor(){}
    getName(nameOrId : any) : string{
      if(typeof nameOrId == "string")
        return "The name of this plane is: " + nameOrId;
      else return nameOrId;
    }
  }

  class PlantInfo extends Plant{
    constructor(){
      super();
    }

    getName(name : string) : string;  //signature
    getName (id: number) : string;    //signature
    getName(nameOrId : any) : string{ //actual function implementation
      var studentID = super.getName(nameOrId);
      return studentID;
    }
  }
  /*
  var test2 = new PlantInfo();
  log(test2.getName(1)); // "1"
  log(test2.getName("Rose")); // "The name of this plane is: Rose"
  */

/***********overrides***********/
  class Plant_2{
    _plant : string;

    constructor(plantName : string){
      this._plant = plantName;
    }

    getName(){
      return "The name of this plane is: " + this._plant;
    }
  }

  class PlantInfo_2 extends Plant_2{
    _plant : string;

    constructor(plantName){
      super(plantName);
      this._plant = plantName;
    }

    getName(){
      return "The name of this plant is: " + this._plant + ". The plant ID is 1234";
    }
  }
  /*
  var plant1 = new Plant_2("Apple tree");
  log(plant1.getName()); //"The name of this plane is: Apple tree"
  var plant2 = new PlantInfo_2("Rose");
  log(plant2.getName()); //"The name of this plant is: Rose. The plant ID is 1234"
  */
