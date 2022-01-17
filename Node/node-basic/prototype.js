function Student() {
        this.name = "Siddharth";
        this.age = 20;
}

Student.prototype = {
    address:"Udaipur",
    getName:function() {
        return this.name;
    }
}

let stud = new Student();
console.log(stud.getName());