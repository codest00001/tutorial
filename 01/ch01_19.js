//filter함수

//짝수만 반환하는 필터 함수 만들기
let arr = [1,2,3,4,5,6,7,8,9,10];

// 방법1)
// const arr2 = arr.filter((x)=>{
//     return x % 2 == 0;
// });

// console.log(arr2);

// 방법2) 위의 함수를 축약해서 쓰는 방법
const arr22 = arr.filter((x) => x % 2 == 0);
console.log(arr22)