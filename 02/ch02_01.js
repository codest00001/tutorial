

const http = require('http'); //commonJs 임포트방식

 // 서버를 만들어줌
 //req는 HttpRequest를 맵핑한 객체, res는 HttpResponse를 맵핑한 객체
const server = http.createServer((req, res)=>{
    res.statusCode = 200; // Ok라는 의미
    res.setHeader("Content-Type", "text/plain"); //client에 제공해줄 컨텐트 데이터타입은 text 
    res.write("hello world");
    res.end();

});

server.listen(4500);