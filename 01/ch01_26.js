//객체에 함수를 넣을 수 있음

let personInfo = {
    name : 'lee',
    age: 55,
    address:'서울 금천구 독산동 123',   
    hobby : ['독서','등산','낚시','넷플릭스'],
    addAge: function(){
        this.age = this.age + 1;
    }
}


console.log(`before call addAge : ${personInfo.age}`) //55
personInfo.addAge(); //1이 더해지는 함수 작동
console.log(`after call addAge : ${personInfo.age}`) //56

