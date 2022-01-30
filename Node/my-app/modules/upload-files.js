var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee');

var conn = mongoose.connection;

var uploadFiles = new mongoose.Schema({
    fileName: String
});

var filesModel = mongoose.model('Files', uploadFiles);
module.exports = filesModel;