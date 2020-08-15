var fs = require('fs');


/*
//readfilesync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

console.log('A');

fs.readFile('syntax/sample.txt', 'utf8', function(err, result){  // readFileSync 리턴값을 주는데 readfile은 리턴값이 아님 그럼 함수를 3번째인자로 줘야함. 그럼 nord.js 가 파일을 읽는 작업이 끝나면 3번째 인자로준 함수를 실행시키면서
  // 첫번쨰인자는 error 가있다면 err을 임자로주고 두번째 parameter에는 파일의 내용을 인자로서 공급해주도록 약속되어있음.
   console.log(result);
}); //sync가 있으면 동기적으로 처리 sync가없으면 비동기적 선호한다는뜻
console.log('C');
