// class of numbers
class ListOfNumbers {
    _items: number[] = [];

    add(item: number) {
        this._items.push(item);
    }

    getItems(): number[] {
        return this._items;
    }
}
// same class but with strings
class ListOfStrings {
    _items: string[] = [];

    add(item: string) {
        this._items.push(item);
    }

    getItems(): string[] {
        return this._items;
    }
}

function test2(a: string, b: boolean){
  console.log(a + b);
}

test2("33", false)

/***********sample generic***********/
function processData<T>(data: T) {
    console.log(typeof data);
}
/*
processData<number>(100); // "number"
processData<string>("one hundred"); // "string"
*/

function identity<T>(arg: T): T {
    return arg;
}
/***********improved 'ListOf...' class using generic***********/
class ListOf<T>{
    _items: T[] = [];

    add(item: T) {
        this._items.push(item);
    }

    getItems(): T[] {
        return this._items;
    }
}
/*
class GenericsTestClass { name: string = "test"; } // just a test class
let genTest = new GenericsTestClass();             // instantiate test class
let listTest = new ListOf<GenericsTestClass>();    // a new list of above class
listTest.add(genTest);                             // add instantiated to list
console.log(listTest.getItems());
*/

/***********using generics with an interface***********/
interface IAccountInfo2 <TRounteNum, TBankNum>{
  routingNum: TRounteNum;
  bankNum: TBankNum;
}

class BankingAccount{
  get accountInfo(): IAccountInfo2<string, number>{
    return{
      routingNum: "100",
      bankNum: 2001
    }
  }
}
