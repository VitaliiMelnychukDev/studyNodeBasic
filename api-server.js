let http = require('http');
let fs = require('fs');

let server = http.createServer(function (req, res) {

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        fs.createReadStream(__dirname + '/templates/hello.html').pipe(res);
    } else if (req.url === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });

        let obj = {
            message: "Hello"
        };
        res.end(JSON.stringify(obj));
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
        });
        fs.createReadStream(__dirname + '/templates/404.html').pipe(res);
    }


});

server.listen(1060, '127.0.0.1');