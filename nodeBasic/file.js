const fs = require("fs");
const zlib = require("zlib");

const FILES_FOLDER = __dirname + "/files/";

const fileContent = fs.readFileSync(FILES_FOLDER + "test.txt", "utf8");
console.log(fileContent);

function readFileAsync(pathToFile, encoding = "utf8") {
    fs.readFile(pathToFile, encoding, function (err, data) {
        if (!err) {
            console.log("File content: " + data);
        } else {
            console.log("FileReadingError: " + err.toString());
        }
    });
}

readFileAsync(FILES_FOLDER + "test.txt");
readFileAsync(FILES_FOLDER + "test1.txt");

const readableStream = fs.createReadStream(FILES_FOLDER + "stream.txt", {
    encoding: 'utf8',
    highWaterMark: 1024
});

const writableStream = fs.createWriteStream(FILES_FOLDER + "streamToWrite.txt");
const writableStreamPipe = fs.createWriteStream(FILES_FOLDER + "streamToWriteViaPipe.txt");
const writableStreamGZ = fs.createWriteStream(FILES_FOLDER + "stream.txt.gz");
const streamGz = zlib.createGzip();

readableStream.pipe(writableStreamPipe);
//Here readableStream  pipe to streamGZ. Inside of streamGZ data are compressed. And pass to writableStreamGZ
readableStream.pipe(streamGz).pipe(writableStreamGZ);

/*
readableStream.on("data", function (data) {
    console.log(data);
    console.log(data.length);
    writableStream.write(data);
});

readableStream.on("error", function (error) {
    console.log(error);
});*/
