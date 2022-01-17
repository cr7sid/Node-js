const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Express Server!")
});

app.get('/users', (req, res) => {
    res.send("Users data accessed!")
});
app.listen(3000);