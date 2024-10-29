// 예외잡기

const posts = {
    data : [
        {
            title : 'Test Title',
            content : 'Test Content',
            author : {
                name : 'lee',
                id : 1,
                age : 15
            }
        },
        {
            title : 'Test Title2',
            content : 'Test Content2',
            author : {
                name : 'hong'           
            }
        },
        {
            title : 'Test Title3',
            content : 'Test Content3',
          
        }
    ]
}

//console.log(posts['data']);

// 예외를 잡는 방법
// 아이템을 돌면서 아이템하나 출력 및 줄 출력, 3번째 아이템의 경우는 author가 없으므로 수행은 안하고 줄만 출력

posts['data'].forEach((item=>{
    if('author' in item){
        console.log(item['author']['name']); //item.author.name으로 적어도 되는 것임.
    }
    console.log('------------')
}))


// 트라이캐치파이널리

posts['data'].forEach((item=>{
    //file open

    //file work
    try{
        console.log(item['author']['name']);
    }
    catch(error){
    //error
        console.log(`error : ${error}`)
    } finally {
    //file close, db close
        console.log('finally')
    }
console.log('--------')
}))
