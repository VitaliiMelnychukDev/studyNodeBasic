
let buff = new Buffer('Hello', 'utf8');
console.log(buff);
console.log(buff.toString());
console.log(buff.toJSON());
console.log(buff[2]);

buff.write('wo');
console.log(buff);


//ES6 examples

let es6Buffer = new ArrayBuffer(8);
let intBufferArr = new Int32Array(es6Buffer);
intBufferArr[0] = 5;
intBufferArr[1] = 23;
console.log(intBufferArr);