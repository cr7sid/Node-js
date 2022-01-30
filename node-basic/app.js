//using require we can import our own or any other modules. Not available in browser environment.

// const helpers = require('./helpers');

// const total = helpers.sum(10,20);
// console.log("Total :", total);

//Insted of importing the whole module, we can destructure it and import only useful objects,

const {sum, mult} = require('./helpers');

const total = sum(10,20);
const product = mult(10,20);
console.log("Total :", total, "Multi :", product);

const fs = require('fs');
const filename = "test.txt";

const errorHandler = (err) => console.log(err);
const dataHandler = (data) => console.log(data.toString());

//Constantly watches the file with filename "test.txt" for any changes.

// fs.watch(filename, () => {
//     console.log("File Changed!");
// });

//Reads the file with filename "test.txt" and then executes the provided callback function.
//As node is asynchronous, it will not wait for the response from file system (as accessing and then reading a file takes longer time),
//instead it will execute continue the flow of code.

//We should not populate the callback functions, instead we should follow functional approach, i.e., create different methods
//for error handling and data handling, etc.

fs.readFile(filename, (err, data) => {
    if(err) {
        errorHandler(err);
        // console.log(err);
    }
    dataHandler(data);
    // console.log(data.toString());
});

console.log("Node js is asynchronous");

// If we want to read the file synchronously then we can use the readFileSync method of fs.

const data1 = fs.readFileSync(filename);

console.log(data1.toString());
console.log("readFileSync is synchronous");

