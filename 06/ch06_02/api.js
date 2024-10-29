const express = require('express');
const moment = require('moment');
const sqlite3 = require('sqlite3');
const path = require('path');

//database설정하기
const db_name = path.join(__dirname,"post.db"); // __dirname이 그 디렉토리 정보를 가져옴. sqlite3 database 파일 이름
const db = new sqlite3.Database(db_name); //db변수에 객체 생성//

const create_sql = `
    create table if not exists posts(
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0  
    );
`;

db.serialize(()=>{
    db.run(create_sql, (err)=>{ //에러표시
        console.log(err);
    });
});

//위에까지 코드짜고 npx nodemon api.js 터미널에 입력하면 post.db라는 파일생성됨

const app = express();
const PORT = 3000;
app.use(express.json());

// app route
// POST
app.post("/posts", (req,res)=>{
    const {title, content, author} = req.body;

    let sql = `insert into posts(title, content, author) values (?, ?, ?)`
    //insert, update, delete
    db.run(sql, [title,content,author], function (err) {
        if(err) {
            res.status(500).json({error:err.message});
        }
        console.log(`row id : ${JSON.stringify(this)}`);
        res.status(201).json({result:'success', id :this.lastID});
    });
});

//포스트맨으로 테스트하기 / 테스트방법
// POST로 메서드를 바꾸고 주소창에 localhost:3000/posts 넣고 
// body에 {
//     "title":"오늘저녁메뉴는",
//     "content":"콘텐츠",
//     "author":"hmkim"
// } 넣어보기

//목록바꾸기

app.get("/posts", (req, res)=>{
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5; //페이지당 5개 게시글을 보여주세요
    const offset = (page - 1) * limit;


    let sql = `select id, title, author, createdAt, count from posts
    order by createdAt desc limit ? offset ?`;

    //select * from posts ; findMany
    db.all(sql, [limit, offset], (err, rows)=>{
        if(err){
            res.status(500).json({error : err.message});
        }
        let total_sql = `select count(1) as count from posts`;
        db.get(total_sql, (err1, row)=>{
            if(err1) {
                res.status(500).json({error:err1.message});
            }
            const total = row.count; //total:13 limit:5 이면
            const totalPages = Math.ceil(total / limit) // 3페이지까지 나오게됨
            res.status(200).json({items:rows, currentPage:page, totalPages:totalPages});
        });
    });
});
//get메서드로 바꾼뒤 localhost:3000/posts/ 주소창에 넣고 send누르면
//그동안 post로 보낸 내용들이 모두 뜬다.
//페이지별로 나오는지 확인하는 코드를 추가함.
//get으로 해두고 포스트맨 주소창에 
// localhost:3000/posts?page=2 적어보기
//page뒤의 숫자를 바꿔보면서 적절하게 나오는 지 확인.


//게시글하나가져오기
//get메소드로 localhost:3000/posts/6 테스트해보기
//특정 게시글의 정보를 조회하고 조회 수를 1 증가시키는 GET 요청 처리 코드
app.get("/posts/:id", (req,res)=>{
    const id = req.params.id;

    let sql = `select id, title, content, author, createdAt, count from posts where id = ?`;
    let count_sql = `update posts set count = count + 1 where id = ?`;
    db.run(count_sql, [id], (err)=>{
        if(err){
            res.status(500).json({error:err.message});
        }
        db.get(sql, [id], (err1, row) => {
            if(err1){
                res.status(500).json({error:err1.message});
            }
            res.json({item:row})
        });
    });
});

//put으로 데이터수정하기 localhost:3000/posts/2
app.put("/posts/:id", (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    let sql = `update posts set title = ? , content = ? where id = ?`;
    db.run(sql, [title, content, id], (err)=>{
        if(err){
            res.status(500).json({error:err.message});
        }
        res.json({result:"success"})
    });
});

//delete로 지우기 localhost:3000/posts/2

app.delete("/posts/:id", (req,res)=>{
    const id = req.params.id;
    let sql = `delete from posts where id = ?`;
    db.run(sql, [id], (err)=>{
        if(err){
            res.status(500).json({err:err.message});
        }
        res.json({result:"success"}) //잘 지워지면 이렇게 나옴
    });
});


app.listen(PORT);

