var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee');

var conn = mongoose.connection;

var employeeSchema = new mongoose.Schema({
    name: String,
    emailId: String,
    eType: String,
    hourlyRate: Number,
    totalHours: Number
});

employeeSchema.methods.salary = function() {
    return this.totalHours * this.hourlyRate;
}

var employeeModel = mongoose.model('Employee', employeeSchema);

var employee = new employeeModel({
    name: "Mamta",
    emailId: "mamtadubey3669@gmail.com",
    eType: "Hourly",
    hourlyRate: 25,
    totalHours: 200});

console.log(employee.salary());

conn.on("connected", function() {
    console.log("Connected Successfully");
});

conn.on("disconnected", function() {
    console.log("Disconnected Successfully");
});

conn.on("error", console.error.bind(console, "connection error:"));

conn.once('open', function() {
    // Query to save a document in db.

    // employee.save(function(err, res) {
    //     if(err) throw err;
    //     console.log(res);
    //     conn.close();
    // });

    //Fetches all the data of employee model from the connected db.

    // employeeModel.find({}, function(err, res) {
    //     if(err) throw err;
    //     console.log(res);
    //     conn.close();
    // });

    //Finds the data with given query and updates the provided data. 

    employeeModel.findOneAndUpdate({name: "Siddharth"}, {hourlyRate: 130, totalHours: 250}, function(err, res) {
        if(err) throw err;
        console.log(res);
        conn.close();
    });

});