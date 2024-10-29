// map 함수

let arr = [1,2,3,4,5,6,7,8,9,10];

const arr2 = arr.map((x)=>x*2) //아래와 같은 코드지만 좀 더 간략하게 표시가능

const arr22 = arr.map(function(x){
return x*2})

console.log(arr2);
console.log(arr22);