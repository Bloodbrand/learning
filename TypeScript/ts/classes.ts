/***********standard class***********/
  class Greeter {
    greeting: string;

    constructor(message: string){
      this.greeting = message;
    }

    greet(){ log(this.greeting) }
  }
  // var g = new Greeter("I'm a new class!");
  // g.greet();

/***********static class***********/
  class BankAccount{
    private static accountNumber: number = 12341234; // private, canot access with BankAccount.accountNumber

    static getAccountNumber(): number {
      return BankAccount.accountNumber;
    }
  }
  // log(BankAccount.getAccountNumber().toString());//class is not instantiated

/***********properties***********/
  class Account_3 {
    private _balance : number = 0;

    get balance(){ return this._balance; }
    set balance(val : number){
      if(val <= 100) this._balance = val;
    }
  }
  /*
  var a_3 = new Account_3();
  log(a_3.balance.toString()); //0
  a_3.balance = 100;
  log(a_3.balance.toString()); //100
  a_3.balance = 300;
  log(a_3.balance.toString()); //100
  */

/***********static properties***********/
  class Constants{
    static get STATIC_NUMBER() : number { return 1234123412341234 };
    static get STATIC_STRING() : string { return "test_test_test_test" };
  }

  class Account_2{ //non-static class, points to static getters
    get accountInfo(){
      return {
        staticNumber: Constants.STATIC_NUMBER,
        staticString: Constants.STATIC_STRING
      }
    }
  }

  /*
  var a_2 = new Account_2();
  log(a_2.accountInfo.staticNumber.toString());
  log(a_2.accountInfo.staticString);
  */

/***********revealing module pattern***********/
  var Account = function(){
    var balance : number = 100;
    var getBalance = function(){
      log(balance.toString());
    };

    return { //returns an object with a property pointing to the "private" method
      getBalance: getBalance
    };
  }();//auto invoked
  //Account.getBalance();

/***********constructor***********/
  class ConstructorTest{
    message : string;

    constructor(msg : string){
      this.message = msg;
    }

    sayMessage(){
      log(this.message);
    }
  }
