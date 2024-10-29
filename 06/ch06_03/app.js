const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const express = require('express');

// !는 필수라는 뜻임
const schema = buildSchema(`
    type Query{
        hello:String
        welcome(name: String!) : String
    }
`);

//resolver
//client library for react : https://www.apollographql.com/docs/react/get-started
const root = {
    hello: () => {
        return "Hello GraphQL";
    },
    welcome: ({name}) => {
        return `Welcome ${name}`;
    }
}



const app = express();
app.use("/graphql", // /graphql 이 경로로 라우터를 적용한다는 의미로 주소를 적는 것임
    graphqlHTTP({
        schema: schema,
        rootValue: root, //resolver root에 담긴 함수 실행/ root라는 이름은 마음대로
        graphiql : true, //true설정이면 client UI 기본제공
    })
);

//크롬에서 접속해보기
//graphql을 설정한 경우는 localhost:4000/graphql
//이 경로를 설정안했다면 localhost:4000으로 접속

app.listen(4000);