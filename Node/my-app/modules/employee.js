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

var employeeModel = mongoose.model('Employee', employeeSchema);
module.exports = employeeModel;