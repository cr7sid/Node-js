var express = require('express');
var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
var empModel = require('../modules/employee');
var fileModel = require('../modules/upload-files');

// Initializing localStorage. We need to check if it is existing already.

if(typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

var router = express.Router();

// Generating a login token and storing it in the localStorage.

router.get('/login', function(req, res, next) {
  // Here in place of foo we can pass the username password to generate a token.

  var token = jwt.sign({foo: 'bar'}, 'loginToken');
  localStorage.setItem('myToken', token);
  res.send('Login successfully');
});

// Removing the stored token after logout.

router.get('/logout', function(req, res, next) { 
  localStorage.removeItem('myToken');
  res.send('Logout successfully');
});

// Middleware function to extract web token from localStorage and verifying the token using jsonwebtoken.

function checkLogin(req, res, next) {
  var myToken = localStorage.getItem('myToken');
  try {
    jwt.verify(myToken, 'loginToken');
  } catch (err) {
    res.send('Login to access this page');
  }
  next();
}

router.get('/', checkLogin, function(req, res, next) {
  empModel.find({}, function(err, data) {
    if(err) throw err;
    res.render('index', { title: 'Employee Records', records: data, success: ''});
  }).clone();
});

router.post('/', function(req, res, next) {
  var newEmployee = new empModel({
    name: req.body.uname,
    emailId: req.body.email,
    eType: req.body.emptype,
    hourlyRate: req.body.hrlyrate,
    totalHours: req.body.ttlhr
  });
  newEmployee.save(function(err, res1) {
    if(err) throw err;
    empModel.find({}, function(err, data) {
      if(err) throw err;
      res.render('index', { title: 'Employee Records', records: data, success: 'Record inserted successfully!'});
    }).clone();
  });
});

var storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage
}).single('file');

router.get('/upload', function(req, res, next) {
  fileModel.find({}, function(err, data) {
    console.log(data);
    if(err) throw err;
    res.render('upload-file', { title: 'Upload File', records: data, success: ''});
  }).clone();
});

router.post('/upload', upload, function(req, res, next) {
  var fileName = req.file.filename;
  var success = fileName + " Uploaded Successfully.";
  var newFile = new fileModel({
    fileName: fileName
  });
  newFile.save(function(err, doc) {
    if(err) throw err;
    fileModel.find({}, function(err, data) {
      if(err) throw err;
      res.render('upload-file', { title: 'Upload File', records: data, success: success});
    }).clone();
  });
});

router.post('/search/', function(req, res, next) {
  var fltrName = req.body.fltrname;
  var fltrEmail = req.body.fltremail;
  var fltrEmpType = req.body.fltremptype;

  var fltrParameter;
  if(fltrName != '' && fltrEmail != '' && fltrEmpType != '') {
    fltrParameter = { $and:[
      { name: fltrName },
      { $and: [
        { emailId : fltrEmail },
        { eType: fltrEmpType}
      ]}
    ]};
  } else if(fltrName != '' && fltrEmail == '' && fltrEmpType != '') {
    fltrParameter = { $and:[
      { name : fltrName },
      { eType: fltrEmpType}
    ]};
  } else if(fltrName == '' && fltrEmail != '' && fltrEmpType != '') {
    fltrParameter = { $and:[
      { emailId : fltrEmail },
      { eType: fltrEmpType}
    ]};
  } else {
    fltrParameter = { eType: fltrEmpType};
  }
  empModel.find(fltrParameter, function(err, data) {
    if(err) throw err;
    res.render('index', { title: 'Employee Records', records: data});
  }).clone();
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  empModel.findByIdAndDelete(id, function(err) {
    if(err) throw err;
    empModel.find({}, function(err, data) {
      if(err) throw err;
      res.render('index', { title: 'Employee Records', records: data, success: 'Record deleted successfully!'});
    }).clone();
  }).clone();
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  empModel.findById(id, function(err, data) {
    if(err) throw err;
    res.render('edit', { title: `Edit ${data.name}'s record`, record: data} );
  }).clone();
});

router.post('/edit/', function(req, res, next) {
  empModel.findByIdAndUpdate(req.body._id, {
    name: req.body.uname,
    emailId: req.body.email,
    eType: req.body.emptype,
    hourlyRate: req.body.hrlyrate,
    totalHours: req.body.ttlhr
  }, function(err, data) {
    if(err) throw err;
    empModel.find({}, function(err, data) {
      if(err) throw err;
      res.render('index', { title: 'Employee Records', records: data, success: 'Record updated successfully!'});
    }).clone();
  }).clone();
});

module.exports = router;
