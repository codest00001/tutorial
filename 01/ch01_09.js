//따옴표, 쌍따옴표, 백틱 사용은 그냥 개인차이. 편한거 쓰기.
//쌤은 백틱많이 쓰심.

//중첩 if문

const date = new Date();
const hour = date.getHours();

if (hour < 11) {
 console.log(`아침`, date, hour)
} else {
    if ( hour < 15 ) {
    console.log(`점심 : 오늘날짜는 ${date}, 현재시간은 ${hour}시 입니다`)
}
    else{
    console.log(`저녁`, date, hour)
}
}