let http = require('http');
let fs = require('fs');

let server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    fs.createReadStream(__dirname + '/templates/index.html').pipe(res);
    /*let html = fs.readFileSync(__dirname + '/templates/index.html', 'utf8');
    let message = "Hello world!!!";
    html = html.replace('{message}', message);
    res.end(html);*/
});

server.listen(1060, '127.0.0.1');