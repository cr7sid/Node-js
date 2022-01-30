// Duplicate declaration is allowed with var, but not in let.

var a = 30;
var a = 40;
console.log(a); 

let b = 30;
// let b = 40; Will give error
console.log(b);

// const makes the variable constant, we can't change it's value after it has been assigned. Although we can edit a constant object.

const c = 40;
// c = 50; Will give error
console.log(c);

const obj = {
    name : "Siddharth",
    age : 28
};
obj.age = 20;
obj.branch = "CSE";
console.log(obj);

// Class in js

class Users {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }
}

let user = new Users("Siddharth", 20);
console.log(user.getName() + " " + user.getAge());