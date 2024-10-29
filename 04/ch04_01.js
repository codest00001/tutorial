const express = require('express') //익스프레스 통으로 받아오기
const fs = require('fs')
const app = express(); //앱이라는 객체에 익스프레스 함수할당
const PORT = 3000; // 포트는 대문자로 쓰자 //
//노드는 삼천번을 많이 사용, 번호는 정하기 나름이지만.
//파이썬은 오천번
//아파치는 팔공팔공
//1024~49151까지는 이하는 관리자권한이 필요하기도함. 특정 어플리케이션이 등록해서 사용가능한 포트.
//49152~65535 까지는 클라이언트 애블리케이션이 임시적으로 사용. 대까지는 클라이언트가 사용
//0~1023까지는 관리자권한이 필요

//app.get이라는 것은 get 요청을 처리하는 것 
//get의 첫인자는 주소 // 두번째는 콜백함수.클라이언트로부터 요청이 들어왔을 때 실행된다.
//createServer쓰던때처럼 if로 안써도 되어서 편하다.

//주요포트번호 80 443 등등등 다양함

app.get("/", (req,res)=>{
res.send("<h1>hello world</h1>")
})

///

app.get("/write", (req,res)=>{
    const posts = [];
    for (let i =0 ; i <10 ; i++){
        posts.push({
            id: i,
            title : `테스트 타이틀 (${i})`,
            content : `테스트 내용입니다 (${i})`
        })
    }


    // 객체를 제이슨문자열로 바꾸기
    fs.writeFileSync("test.json", JSON.stringify({data:posts}))
    res.send("<h1>test.json 파일 생성 성공👌</h1>")
})

///

app.get("/list", (req,res) => {
    const data = fs.readFileSync("test.json", "utf-8");
    const result = JSON.parse(data)
    const posts = result["data"];
    posts.forEach(x=>{ //포스트객체를 돌면서 객체를 추가 또는 삭제
        x["author"] = {
            name : "박길동",
            email : "h2@gmail.com"
        }
    });
    res.status(200).json({data:posts});
});

app.get("/view/:postId",(req, res)=>{ 
    //http://localhost:3000/view/1 : 1부분은 동적으로 변하는 아이디
    const postId = req.params.postId;
    const data = fs.readFileSync("test.json","utf-8");
    const jsonObj = JSON.parse(data);
    const posts = jsonObj["data"];
    const selectedPost = posts.filter(item => {
        return item.id == postId;
    });
    console.log(selectedPost[0]);
    res.json({data : selectedPost[0]});
});

app.listen(PORT, ()=>{
    console.log(`익스프레스 서버가 실행 중입니다. ${3000}에서`)
});

//엑스프레스에서는 res.json에 넣으면
//자동으로 객체를 json문자열로 반환해주므로 stringify안써도 된다.
//포스트를 돌면서 값을 수정가능






