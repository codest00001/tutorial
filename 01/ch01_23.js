//setTimeout
//두개가 필요 : 지연시간 되면 할 일, 지연시간

console.log(`begin`)
setTimeout(()=>{
console.log('1초가 지났음')
},1000);

//setInterval 주어진초마다 실행
setInterval(()=>{
    console.log('일초마다 보여지는 텍스트')
},1000)

