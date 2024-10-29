// async await


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

async function getData(){
    try{ // Promise의 then과 같음
        const data = await fetchData();
        console.log(`fetchData result => ${JSON.stringify(data)}`);
        console.log(`fetchData result => `, data);
    } catch(e){
        console.error(e);
    }
}

getData();