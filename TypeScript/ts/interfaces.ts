/***********defining an Interface***********/
  interface IMessage{
    greeting : string;
  }

  interface IGreet{
    greet(msg : IMessage) : void;
  }

  interface IAccountInfo{
    routingNumber : string;
    bankNumber : number;
  }

  interface IDepositWithdrawl{
    deposit(amount : number) : void;
    withdrawl(amount : number) : number;
  }

  interface IAccount extends IDepositWithdrawl{
    accountInfo : IAccountInfo;
    balance : number;
    title : string;
  }
/***********oprional properties***********/
  interface IOptional{
    mandatory : string;
    optional? : string; //notice '?'
  }

  class OptionalPropClass implements IOptional{
    mandatory : string = "hello";
    //'optional' field not implemented
  }

/***********implementing an Interface***********/
  class Greeter_2 implements IGreet{
    greet(msg : IMessage){
      log(msg.greeting);
    }
  }

  class Message implements IMessage{
    greeting : string = "hello!";
  }
  /*
  var greeter = new Greeter_2();
  var msg = new Message();
  greeter.greet(msg);
  */

/***********custom array***********/
  interface AccountArray{
    [index : number] : IAccount;
    length : number;
  }

  class CheckingAccount implements IAccount{
    accountInfo : IAccountInfo;
    balance : number;
    title : string;

    constructor(amount : number){
      this.balance = amount;
    }

    deposit() {}
    withdrawl() : number {return 0;}
  }
  /*
  var acctArray : AccountArray;
  acctArray = [new CheckingAccount(123), new CheckingAccount(456), new CheckingAccount(789)];

  for (let i = 0; i < acctArray.length; i++) {
    log("$" + acctArray[i].balance.toString());
  }
  */

/***********custom function types***********/
interface SearchFunc {
  (source : string, subString : string): boolean;
}

var mySearch : SearchFunc;
mySearch = function(src : string){ //todo: params dont have to match?
  return true;
}
