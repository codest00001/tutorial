
//함수선언문
function add1(x, y){
    console.log(`${x} ${y}`);
    const r = x + y;
    return r;
}

console.log(`add1 result => ${add1(11,12)}`)


//익명함수
const add2 = function(x,y){
    console.log(`add2 x :  ${x} , y : ${y}`);
    const r = x + y;
    return r;
}

console.log(`add2 result => ${add2(11,12)}`)

//화살표함수
const add3 = (x, y) => {
    console.log(`add3 x : ${x} y : ${y}`)
    const r = x + y ;
    return r;
}

console.log(`add3 result => ${add3(10,20)}`)

//다른 문장 없으면 이렇게 써도 가능함
const add4 = (x, y) => x + y;
console.log(`add4 result => ${add4(14,24)}`)
