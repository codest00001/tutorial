const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

//Graphql module
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

//setting db
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

const app = express();
const PORT = 4000;

const create_sql = `
    create table if not exists posts(
    id integer primary key autoincrement,
    title varchar(200),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
    );
`;

db.exec(create_sql); //execute create_sql

//스키마
const schema = buildSchema(`
    type Post{
    id : ID!
    title : String
    content : String
    author : String
    createdAt : String
    }

    type Query{
        getPosts : [Post]
        getPost(id:ID!) : Post
    }

    input PostInput{
        title : String
        content : String
        author : String
    }

    type Mutation{
    createPost(input : PostInput) : Post
    updatePost(id:ID!, input:PostInput) : Post
    deletePost(id:ID!): String
    }
    `)

//리졸버 : 스키마에 있는 쿼리나 뮤테이션을 실행하는 함수모음
const root = {
    getPosts: () =>{
        return db.prepare(`select * from posts`).all();
    },
    getPost:({id})=>{
        return db.prepare(`select * from posts where id=?`).get(id);
    },
    //포스트맨에 GET도 되고 POST 중에서 하나 고르기. graphql에서는. 아래 코드 QUERY에 넣기
    // {
    //     getPosts{
    //         id
    //         title
    //         content
    //     }
    // }

    //# id:1 번인 것을 지정해서 가져오기
    // {
    //     getPost(id:1) {
    //     title
    //     content
    //      }
    //    }


    createPost : ({input}) =>{
        console.log(input.title, input.content, input.author);
        const info = db.prepare(`insert into posts(title,content,author)
            values(?,?,?)`).run(input.title, input.content, input.author);
            console.log(input)
            return {id:info.lastInsertRowid, ...input}
    },
//글생성 쿼리 / 포스트맨에 POST로 아래 코드 QUERY에 넣기
//mutation{
//    createPost(input: {title:"a",content:"b",author:"c"}){
//        id}
//}
    updatePost: ({id, input})=>{
        const info = db.prepare(`update posts set title=?,
            content=? where id=?`).run(input.title, input.content, id);
            return{id, ...input}
    },
    // 업데이트쿼리
    // mutation{
    //     updatePost(id: 1, input: {title:"aa",content:"bb"}){
    //         id}
    // }
    
    deletePost:({id}) => {
        const info = db.prepare(`delete from posts where id = ?`).run(id);
        return `Post[$] is deleted`
    }

    // 삭제쿼리
    // mutation{
    //     deletePost(id: 1)  
    // }




}

app.use("/graphql",graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true,
}))

app.listen(PORT); //listening port 4000