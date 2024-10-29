// 콜백함수

let data;

// from remote mock
const fetchData = (cb) => { //cd : handleData
    setTimeout(()=>{
        data = {
            name : 'lee',
            age : 15,
        };
        cb(data);
    },2000);
}

const handleData = (data) => { // callback function 
    console.log(`from callback : ${JSON.stringify(data)}`); //JSON.stringify를 안쓰면 그냥 object라고만 알려주게 됨
}
 
fetchData(handleData);

//data자리에 또 함수가 또 또 들어가면서 콜백지옥이 되기도 함.

// //콜백함수를 써야 하는 이유
// 원하는 결과를 얻지 못한다.
// 데이터가 준비되지 않았는데도 출력 코드가 실행되기 때문에, 데이터가 undefined 상태일 수 있습니다.
// 비동기 함수가 완료되기 전에 다음 코드가 실행되므로, 순차적으로 실행하려는 의도와 맞지 않습니다.