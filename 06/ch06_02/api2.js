const express = require('express');
const moment = require('moment');
const path = require('path');
const Database = require('better-sqlite3');

//db setting
const db_name = path.join(__dirname,'post.db');
const db = new Database(db_name);
const create_sql = `
    create table if not exists posts(
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0  
);
    create table if not exists comments(
        id integer primary key autoincrement,
        content text not null,
        postId integer,
        foreign key(postId) references posts(id)
);
`;

db.exec(create_sql);
const app = express();
const PORT = 3000;
app.use(express.json());

//위에까지 코드짜고 
//npx nodemon api2.js 터미널에 입력해서 서버실행. comments 생김
//vscode다시 켜면 npx nodemon api2.js 다시 적어야함

//게시글목록 가져오기
//포스트맨 확장클릭하고 확인해보기
//겟항목 선택하고 포스트맨 주소창에 localhost:3000/posts?page=2

app.get("/posts",(req, res)=> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const offset = (page-1)*limit;

    const sql = `
    select id, title, author, createdAt, count from posts
    order by createdAt desc limit ? offset ? 
    `;


    const stmt = db.prepare(sql);
    const rows = stmt.all(limit, offset);

    const total_sql = `select count(1) as count from posts`;
    const row = db.prepare(total_sql).get();
    const totalPage = Math.ceil(row.count/limit);

    res.json({items:rows, currentPage:page, totalPages:totalPage});
});

//게시글 상세보기
//포스트맨확장 클릭하고 GET체크하고 localhost:3000/posts/1
//메소드체이닝으로 코드가 간단해짐
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    // const sql = `select * from posts where id = ?`; 기존것

//문제로 추가부분
    const sql = `
    SELECT 
    p.*, '[' || group_concat( '{"id":'||c.id||', "content":"'|| c.content || '"}' ) || ']' as comments
    FROM posts p left join comments c on p.id = c.postId
    where p.id = ?
    group by p.id
`; 

    const count_sql = `update posts set count = count + 1 where id = ?`;
    db.prepare(count_sql).run(id);
    const post = db.prepare(sql).get(id)

//문제로 추가부분
post.comments = JSON.parse(post.comments); 

    res.status(200).json({item:post});
});



//글쓰기 
//post로 해두고 localhost:3000/posts/ 로 send해서 확인
app.post("/posts", (req,res) => {
    const {title, content, author} = req.body;
    const sql = `insert into posts(title, content, author) values(?,?,?)`;
    const result = db.prepare(sql).run(title, content, author);
    console.log(`result is ${JSON.stringify(result)}`);
    res.status(201).json({id:result.lastInsertRowid,
        title : title, content: content});
} )

//글 수정
app.put("/posts/:id", (req, res)=>{
    const id = req.params.id;
    const {title,content} = req.body;
    const sql = `update posts set title = ?, content = ? where id = ?`;
    try{
        const result = db.prepare(sql).run(title, content, id);
        console.log(`update result : ${JSON.stringify(result)}`);
        if(result.changes){ //수정 성공 후 메시지
            res.status(200).json({result : `success`});
        }else{ //예를 들어 3번 포스트가 없는데 수정하려고 할 때
            res.status(404).json({error:`post not found`});
        }
    }catch(e){ //서버 에러 발생 시
        res.status(500).json({error:e})
    }
})

//글 삭제
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const sql = `delete from posts where id = ?`
    try{
        const result = db.prepare(sql).run(id);
        if(result.changes){ //삭제 성공 후 메시지
            res.status(200).json({result:`success`});
        }else{ //예를 들어 3번 포스트가 없는 데 삭제하려고 할 때
            res.status(404).json({result:`post not found`});
        }
    }catch(e){ //서버 에러 발생시 
        res.status(500).json({error:e})
    }
} 
)

// 댓글 추가하기
// 10번 글에 댓글달고 싶다면 localhost:3000/posts/10/comments 주소창에 넣고
// body - raw - json선택한 후에 
//{"content":"코멘트10"} 내용 입력하기

app.post("/posts/:id/comments",(req,res) => {
    const postId = req.params.id;
    const {content} = req.body;
    const result = db.prepare(`insert into comments(postId, content) values(?,?)`).run(postId,content);
    res.status(200).json({id:result.lastInsertRowid,postId:postId,content:content});
});

//댓글 가져오기
app.get("/posts/:id/comments", (req, res)=>{
    const postId = req.params.id;
    const comments = db.prepare(`select * from comments where postId = ?`).all(postId);
    res.json({comments:comments})
})

//댓글 수정 
// 아예 커맨트아이디를 바로 줘도 됨
app.put("/posts/:postId/comments/:id", (req,res)=>{
    const {content} = req.body;
    const id = req.params.id;
    const result = db.prepare(`update comments set content = ? where id = ?`).run(content, id);
    if(result.changes){
        res.status(200).json({result:`ok`, message:`success`, error : ''});
    }else{
        res.status(404).json({result:`ok`, message : `comment is not found`})
    }
});

//댓글 삭제 
app.delete("/posts/:postId/comments/:id", (req,res)=>{
    const id = req.params.id;
    const result = db.prepare(`delete from comments where id = ?`).run(id);
    if(result.changes){
        res.status(200).json({result:`ok`, message : `success`, error:``});
    }else{
        res.status(404).json({result:`ok`, message : `success`, error:``})
    }
});

//문제1)게시글 상세 GET /posts/1을 요청할 경우 해당글의 comments에 답글이 있는 경우
//게재글 상세와 답글 목록을 한번에 조회해보기. 쿼리는 한번에 서브쿼리, 조인사용가능
// app.get("/posts/:id",(req, res)=>{
//     const id = req.params.id;
//     const sql = `
//         SELECT 
//         p.*, '[' || group_concat( '{"id:'||', "content":"'|| c.content || '"}')||']' as comments
//         FROM posts p left join comments c on p.id = c.postId
//         where p.id = ?
//         group by p.id
//     `; //added
//     const count_sql = `update posts set count = count + 1 where id = ?`;
//     db.prepare(count_sql).run(id);
//     const post = db.prepare(sql).get(id)
//     post.comments = JSON.parse(post.comments); //added
//     res.status(200).json({item:post});
// });





app.listen(PORT);

