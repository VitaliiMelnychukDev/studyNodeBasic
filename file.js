let fs = require('fs');

let fileText = fs.readFileSync(__dirname + "/files/test.txt", 'utf8');
console.log(fileText);

let fileTextSync = fs.readFile(__dirname + "/files/test.t1xt", 'utf8', function (err, data) {
    if(!err) {
        console.log(data);
    } else {
        console.log("FileReadingError: " + err.toString());
    }
});

console.log("End of code!");