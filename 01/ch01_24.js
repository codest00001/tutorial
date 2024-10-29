// 객체

let personInfo = {
    name : 'lee',
    age: 55,
    address:'서울 금천구 독산동 123',   
    hobby : ['독서','등산','낚시','넷플릭스']
}

console.log(personInfo);

//객체에 접근하기.대괄호안에 문자열로

//방법1)대괄호안에 문자열로 키를 집어넣기
console.log(personInfo['name']); //이름에접근하기
console.log(personInfo['age']); //나이에 접근하기

//방법2) . 으로 접근가능
console.log(personInfo.name); 

// JSON 포맷으로 바꾸기
console.log(JSON.stringify(personInfo)); //키가 문자열로 바뀜
console.log('----------------')

//데이터 추가하기 //기존에 없는 키에 값을 넣는 것
personInfo['gender'] = 'M'
console.log(personInfo);

//데이터 수정하기 //기존에 있는 키에 값을 넣는 것은 수정한다는 의미
personInfo['address'] = '서울시 양천구 목동 222'; 
console.log(personInfo);




