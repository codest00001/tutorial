const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res)=>{
    const path = url.parse(req.url, true).pathname; 
    //true는 query파라미터를 파싱할 것인지 여부
    //http://localhost:3000/json?name=lee&age=30

    if(path == '/json') {
        res.setHeader('Content-Type','application/json;charset=UTF-8');
        const data = {
            name: 'lee', age: 40, address : '서울시 양천구 신정동'
        }
        const result = JSON.stringify(data);
        res.end(result);
    }else if(path == '/test'){
        // /test로 들어왔을 때 test2.json의 내용을 json포맷으로 클라이언트 응답보내기.
        res.setHeader('Content-Type','application/json;charset=UTF-8');
        const data = fs.readFileSync('test2.json','utf-8');
        res.end(data);
    }
}).listen(4500);