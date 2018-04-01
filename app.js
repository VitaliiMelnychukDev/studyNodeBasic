let express = require('express');

let app = express();

let port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send("<html><head></head><body><h1>Hello</h1></body></html>");
});

app.get('/person/:id', function (req, res) {
    res.send(`<html><head></head><body><h1>${ req.params.id }</h1></body></html>`);
});

app.get('/api', function (req, res) {
   res.json({
       "test": "Hello"
   });
});

app.listen(port);