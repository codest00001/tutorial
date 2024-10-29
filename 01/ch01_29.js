// Promise

const fetchData = () => {
    return new Promise ((resolve, reject)=>{
        //fetch from remote if success true, else false
        setTimeout(()=>{
            const success = true; //false로 바꾸면 error 505출력됨
            const data = {
                name : 'lee', age:15
            }
            const error = {
                message : 'error 505'
            }
            if(success){
                resolve(data);
            } else{
                reject(error);
            }
        }, 2000);
    });
}

// 이 부분만 잘 알면 된다. 사용하는 방법을 잘 알아야함.
// 일할 때 우리가 패치데이터를 직접 만드는 일은 없음. 외부것을 불러오기 때문에.
const result = fetchData();
result.then ((data)=>{ // resolve // then을 써야함.
    console.log('resolve',data);
}).catch((error)=>{
    console.log('reject',error);
})


// //then을 사용하지 않은 경우:
// Promise가 반환되지만, 아무런 결과를 처리하지 않으므로 Promise { <pending> } 상태로 출력됩니다.
// 에러가 발생하지 않더라도, 결과를 얻을 수 없기 때문에 어떠한 출력도 발생하지 않습니다.