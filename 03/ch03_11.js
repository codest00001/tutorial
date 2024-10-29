const http = require('http');
const url = require('url');

http.createServer((req,res)=>{
    const path = url.parse(req.url, true).pathname; 
    
    //이걸추가해야한글안깨져보임
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if(path == "/hello"){
        res.end("<h1>hello화면</h1>");
    }else if (path == "/world"){
        res.end("<h1>world화면</h1>")
    }else if(path == "/"){
        res.end("<h1>home</h1>")
    }
}).listen(4500);