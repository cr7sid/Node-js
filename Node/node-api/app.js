const express = require('express');
const app = express();

//bringing in the routes.

const postRoutes = require('./routes/post');

app.get("/", postRoutes.getPosts);

const port = 8080;
app.listen(port, () => console.log(`A Node JS API is listening on port: ${port}`));

