let express = require('express');

let app = express();

let port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.use('/', function (req, res, next) {
    console.log('Requested URL' + req.url);
    next();
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/person/:id', function (req, res) {
    res.render('person', {
        'id': req.params.id
    });
});

app.get('/api', function (req, res) {
   res.json({
       "test": "Hello"
   });
});

app.listen(port);