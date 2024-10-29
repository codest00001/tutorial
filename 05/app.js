const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.set("view engine","ejs");
app.set("views","./views");

app.get("/", (req,res)=> {
    res.render("index",{
        title : "안녕하세요😎",
        message : "반갑습니다"
    })
})

const posts = [
    {title : "테스트타이틀1", content:"테스트콘텐트1"},
    {title : "테스트타이틀2", content:"테스트콘텐트2"},
    {title : "테스트타이틀3", content:"테스트콘텐트3"}
];

app.get("/sample",(req,res)=>{
    res.render("sample",{data:posts})
})


app.listen(PORT);