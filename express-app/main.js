const express = require('express');
const bodyParser = require('body-parser');
const {check, validationResult, matchedData, sanitizedBody} = require('express-validator');

const app = express();

// Now we can use all the static files from the public folder. abc will be the virtual path shown in url
app.use('/abc', express.static('public'));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

// Sets the view engine to pug, so now we won't have to use .pug while using the view file in code.
app.set('view engine', 'twig');

// Sets the path of all the views to /public/views directory, now we can simply use the name of file without specifying the dir 
// everytime.
app.set('views', './public/views');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {

    // To show view using template webgines we use render.
    res.render('index', {title: "Login Form", message: "Enter Username Password"});
});

app.post('/', urlencodedParser, [
    check('username', "Username should be email").trim().isEmail(),
    check('password', "Password should be greater than 5 characters").trim().isLength({min:5}),
    check('cpassword').custom((value, {req}) => {
        if(value != req.body.password) {
            throw new Error("Confirm passwords should match the password");
        }
        return true;
    })
]
,(req, res) => {
    const errors = validationResult(req);
    console.log(errors.mapped());
    const user = matchedData(req);
    if(!errors.isEmpty()) {
        res.render('index', {title: "Login Form", error: errors.mapped(), user: user});
    } else res.render('login', {title: "User Details", user: user});
});

app.get('/about/:a-:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    const diff = a - b;
    const mult = a * b;
    res.render('about', {sum: sum, difference: diff, multiplication: mult});
});

app.listen(3000);
