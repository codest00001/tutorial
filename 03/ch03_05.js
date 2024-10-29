//디렉토리 만들기

const fs = require('fs');

const dirname = "naver/daum/google"
//파라미터
//첫번째는 경로
//두번째는 옵션주기 
//(리커시브는 중첩디렉토리생성가능하게 할 것인지임. true로 해야 만들어짐. false로 기본세팅되어있음)
//없으면 만들고 그 경로가 있으면 안만든다.

fs.mkdirSync(dirname, {recursive : true});

const content = `안녕하세요 네이버 구글 다음 중 하나에 입사하고 싶어용_또만들었다1`;

//----------------------------------------------------

//문제) naver/daum/google/out.txt 에 content내용을 넣기
fs.writeFileSync(`${dirname}/out.txt`, content)