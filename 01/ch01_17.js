// break와 continue 실습

// let arr = [5,23,'hello',true,'world',-9];

// for (i in arr){
//  if(typeof(arr[i])=='string'){
//     break;
//  }
//     console.log(`${arr[i]}`);
// }

// 배열의 첫 번째 값인 5는 숫자이므로 출력됨.
// 배열의 두 번째 값인 23도 숫자이므로 출력됨.
// 배열의 세 번째 값인 'hello'는 문자열이므로, 이 지점에서 break가 실행되어 반복문이 멈춤.

// 출력
// 5
// 23

///////////////////////////////////////////////////////////////////////////////////////////

let arr = [5,23,'hello',true,'world',-9];

for (i in arr){
 if(typeof(arr[i])=='string'){
    continue;
 }
    console.log(`${arr[i]}`);
}

// continue는 해당조건을 만나면 그 아래 조건을 실행안하고 바로 다음으로 넘어가는 것