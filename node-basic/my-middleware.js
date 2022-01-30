// We can also use an external middleware by exporting it and importing in the main file.

module.exports = (options) => {
    return (req, res, next) => {
        console.log("Home validation " + options.option1);
        next();
    }
}