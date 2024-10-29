//처음의 데이터는 자바스크립트 객체(JavaScript Object) 형태로 존재하며, 
//이 객체가 JSON 문자열로 변환된 후 파일에 저장

const fs = require('fs')


let posts = [];
for (let i = 0 ; i < 20; i++){
    posts.push(
        {
            title : `나는 제목이야 [${i}]`,
            content : `나는 내용이야 [${i}]`,
            author : `홍길동 [${i}]`,
            createAt: new Date()
        }
    )
}

const data = {
    data : posts
}
//자바스크립트객체를 파일로 보내려면 제이슨문자열로 바꿔야 
//다른 데에 전해줄 수 있기 때문에 이걸 쓰는 것

//파스를 쓰는 이유는 제이슨파일에서 불러와서 객체로 쓰는 것
//파스를 쓰면 객체로 만들어주니까 그 안에 있는 내용을 쉽게 접근 가능
const jsonStr = JSON.stringify(data, null, 2);
//javascript object -> json string
//JSON stringify 2번재 인자는 replacer. 의미는 속성을 필터링 또는 변환할 때 사용
//세번째 인자는 띄어쓰기 공백 수 2니까 스페이스가 2개만큼씩 인덴테이션
fs.writeFileSync("test2.json",jsonStr,"utf-8");