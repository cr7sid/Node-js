// function sum(a, b) {
//     return a + b;
// }

// module.exports = {
//     sum
// }

exports.sum = (a,b) => {
    console.log(this);
    return a + b;
}

exports.mult = (a,b) => a * b;