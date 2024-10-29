const fs = require('fs');

//readFile이 비동기방식
fs.readFile('hello.txt','utf-8',(err,data)=>{
    if(err){
        console.log(`error : ${err}`)
    }
    console.log(`readFile data : ${data}`)
})

console.log('-----1') 


//readFileSync는 동기방식
const data = fs.readFileSync(`hello.txt`,`utf-8`);
console.log(`readFile Sync data : ${data}`)


console.log('-----2') 

//리드파일이 비동기함수라서 중간구분 콘솔로그가 가장먼저 출력됨