// 형변환

console.log(String(52)); //숫자출력
console.log(typeof(String(52))); //string
console.log(typeof(52+"")); //string
console.log(typeof(`${52}`)); //string //백틱기호 안에 들어가면 다 문자

console.log(typeof(Number(String("52")))); //number
console.log(typeof(parseInt(String("52")))); //number
console.log(typeof(parseFloat(String("52.01")))); //number

console.log(isNaN(Number('hello'))); //true
