let fs = require('fs');

let fileText = fs.readFileSync(__dirname + "/files/test.txt", 'utf8');
console.log(fileText);

let fileTextSync = fs.readFile(__dirname + "/files/test.txt", 'utf8', function (err, data) {
    if(!err) {
        console.log(data);
    } else {
        console.log("FileReadingError: " + err.toString());
    }
});

let readableStream = fs.createReadStream(__dirname + "/files/stream.txt", {
    encoding: 'utf8',
    highWaterMark: 1024
});

let writableStream = fs.createWriteStream(__dirname + "/files/streamToWrite.txt");

readableStream.on('data', function (data) {
    console.log(data);
    console.log(data.length);
    writableStream.write(data);
});

readableStream.on('error', function (error) {
    console.log(error);
});

console.log("End of code!");