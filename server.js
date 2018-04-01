let http = require('http');

let server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    res.end('Hello!');
});

server.listen(1060, '127.0.0.1');