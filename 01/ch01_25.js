let personInfo = {
    name : 'lee',
    age: 55,
    address:'서울 금천구 독산동 123',   
    hobby : ['독서','등산','낚시','넷플릭스']
}

for (let key in personInfo){
    console.log(`${key} => ${personInfo[key]}`)
}

console.log('------------')

console.log(`key list : 
    ${Object.keys(personInfo)}`)

console.log(`key list type : 
    ${typeof(Object.keys(personInfo))}`)

console.log('------------키들 출력하기')

Object.keys(personInfo).forEach(key=>{
    console.log(`${key} => ${personInfo[key]}`)})

// 해당 키가 있는지 여부를 찾는 방법
// console.log(personInfo['address']);

// console.log(personInfo['test']); //해당 키가 없는데 달라고하면 // undefined출력

// console.log(personInfo['address']['a']); //있는 키에 없는 값을 달라고하면 //undefined

// console.log(personInfo['test']['a']);//없는 키에 없는 값을 달라고하면 //에러발생
console.log('------------<')

const keyss = Object.keys(personInfo); // 키를 배열로 반환하는 매서드//해당 객체에서 키들만 출력하여 keyss라는 변수에 담음
console.log(keyss) // 키들만 출력됨

console.log('-------------<')
console.log(keyss.includes('test')) // keys안에 test라는 키가 있는지 여부를 출력함 //false라고 출력됨

console.log('------------<')
if(keyss.includes('test')){ //test라는 키가 있어야만 아래 콘솔로그를 타는 것이므로
    console.log(personInfo['test']['a']); //에러가 안남.
}

