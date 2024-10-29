const fs = require('fs');
const path = require('path');

//이 경로가 실제로 존재하지 않더라도
//변수는 해당 경로를 가리키는 문자열을 가지고 있을 뿐입니다.
const newFilePath = path.join(__dirname, 'a3','b3','c3','d3.txt');
console.log(newFilePath);
console.log(path.parse(newFilePath).dir);//디렉토리까지만 나옴
console.log(path.parse(newFilePath).base);//파일명만 나옴

const makeFile = (fpath, content) => { // fpath: 파일 경로, content: 파일에 쓸 내용
    const filename = path.parse(fpath).base; // 주어진 파일 경로에서 파일 이름을 추출합니다.
    if (filename.includes(".")) { // 파일 이름에 점이 포함되어 있는지 확인 (즉, 파일 확장자가 있는지 확인)
        const dirname = path.parse(fpath).dir; // 주어진 파일 경로에서 디렉토리 이름을 추출합니다.
        fs.mkdirSync(dirname, { recursive: true }); // 디렉토리가 존재하지 않으면 생성합니다. (recursive 옵션으로 하위 디렉토리도 생성)
        fs.writeFileSync(fpath, content); // 주어진 경로에 파일을 생성하고 내용을 씁니다.
    }
}

makeFile(newFilePath, '새로운 파일이 생성되었습니다3'); // newFilePath에 파일을 생성하고 내용을 씁니다.

