const fs = require(`fs`);

const result = fs.readFileSync('test.json','utf-8');

// console.log(result) //이거는 문자열로 출력이 된다. 그래서 ""이것도 그대로 찍힘

const data = JSON.parse(result); //여기서 parse하면 result라는 게 객체로 바뀐다.

const posts = data["data"];
posts.forEach(item => {
    console.log(item['title'],item['content'],item['author']); //item.title 이렇게 접근해도 가능
})

