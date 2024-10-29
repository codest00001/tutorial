//txt 파일만들기

const fs = require('fs');

const content = `안냐세여, 홍길동입니다. 
날씨가 추워집니다. 
지금은 3교시 수업시간이얌얌얌22`;

//writeFile 파라미터가 세개
//첫번째는 파일명
//두번째는 내용
//세번째는 에러콜백함수
//세번째에 utf-8을 넣어도 된다.그다음에 콜백넣기

// fs.writeFile('out.txt', content, (err)=>{
//     console.log(err);
// })

fs.writeFileSync('out2.txt', content, 'utf-8');