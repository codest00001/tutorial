//콜백함수 : 함수의 인자로 함수가 들어가는 함수

function tentimes (cb) {
    for(let i = 0;i<10;i++){
        cb(i);
    }
}

tentimes(function(i){
    console.log(`${i} call this function`)
})