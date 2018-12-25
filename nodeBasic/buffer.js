const buff = Buffer.alloc(5, "Hello", "utf8");
console.log(buff);
console.log(buff.toString());
console.log(buff.toJSON());
console.log(buff[2]);
buff.write("repl", "utf8");
console.log(buff.toString());


//ES6 examples
let es6Buffer = new ArrayBuffer(8);
es6Buffer[0] = 't';
let intBufferArr = new Int32Array(es6Buffer);
intBufferArr[0] = 5;
intBufferArr[1] = 23;
console.log(es6Buffer);
console.log(intBufferArr);