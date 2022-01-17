const http = require('http');

const server = http.createServer((req, res) => {
    res.end("First Node server");
});

server.listen(3000);