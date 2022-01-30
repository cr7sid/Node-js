const express = require('express');
const app = express();

var homeMiddleWare = require('./my-middleware.js')

// In express we can use a middleware function that will check any prequisite condition that is required to access the router callback.
var validation = (req, res, next)  => {
    // Here we can specify the case in which the user is allowed to access the data.
    // The next() call will trigger the callback funtion of the router.
    console.log("User validation" + req.params.Id);
    next();
};

// app.use(middleware-func) will apply the middleware to all the routes.
// If we want to apply the middleware to a specific route then we can pass it as param.

// app.use(validation);

app.get('/', homeMiddleWare({option1:'abc', option2:'xyz'}), (req, res) => {
    console.log("Home");
    res.send("Express Server!")
});

// To obtain dyamic data from url. To make the parameter optional we use ?

app.get('/users/:Id?', validation, (req, res) => {
    console.log("Users");
    if(req.params.Id == undefined) {
        res.send("All users data accessed!");
    } else {
        res.send(`User ${req.params.Id}'s data accessed!`)
    }
});

// We can use (-) or (.) i case we need to send data from-to kind of data.

app.get('/flights/:From?.:To?', (req, res) => {
        res.send(`Searched flight from: ${req.params.From} To ${req.params.To}`)
});
app.listen(3000);