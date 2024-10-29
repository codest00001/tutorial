// forEach구문

let arr = [1,2,3,4,5,6,7,8,9,10];

arr.push(11);
arr.push(12);
arr.push(13);

arr.forEach((x, i)=>{
    console.log(`${x} ${i}`)
}

)

// x는 element, i는 index임
// i는 필요없으면 안 써도 됨