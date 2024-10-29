
//Node.js에서 자식 프로세스를 생성하고, 명령어를 실행하기 위한 exec 함수를 불러오는 코드
//exec는 하나만 써도 된다. 키와 값이 같은 경우이므로
const {exec:exec} = require('child_process');

// 이런방법도 가능
//const cp = require('child_process')
//cp.exec 

//실행할 명령어 설정 (Windows의 경우 현재 디렉토리의 파일 및 폴더 목록을 표시)
const cmd = `dir`;

// 파라미터 
//명령 실행이 완료되면 호출되는 콜백 함수입니다.
//이 함수는 다음과 같은 세 개의 매개변수를 받습니다
exec(cmd, (err, stdout, stderr)=>{
    if(err){
        console.log(`에러발생 : ${err}`);
        return;
    }
    console.log(stdout);
})