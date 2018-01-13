const http = require('http');
// require http 라는 모듈을 http라는 상수(할당되면 변하지 않음)에 담은 것
const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//서버가 비동기 방식으로 listen이 완료 되었을 때 완료 출력을 하고
//server 의 콜백 함수를 통해 요청을 처리한다.
var server2 = http.createServer(function(req,res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server2.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`); //작은 따옴표 아니다.
})
