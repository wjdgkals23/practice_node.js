//test express
//main application
var express = require('express'); //함수 형태
var app = express(); //익스프레스 객체 선언
var bodyParser = require('body-parser');//post로 날아온 정보를 읽이 위해 필요한 미들웨어
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views'); //템플릿 저장 공간에 연결
app.use(express.static('public')); //정적인 파일의 디렉토리 지정
//정적인 파일은 서버를 재시작하지 않아도 수정부분이 적용된다.
//get 메소드 -> 라우터 라고한다.
//라우트는 길을 설정한다. 라는 뜻이다.
//라우팅 체크해야한다.
// 사용자 --------- router --------- controller
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req, res){ //홈에 접속을 완료했을 때 뒤에 있는 콜백함수가 작동되면서 hello world 작동
  res.send("hello world");
});

app.get('/dynamic', function(req, res){
  var lis = '';
  var list_count = 6;
  var time = Date();

  for(var i=0; i<list_count; i++){
    lis = lis + '<li>coding'+i+'</li>';
  }
  //동적으로 할 경우 자바스크립트의 반복문과 변수를 통해 편리한 페이지 생성이 가능하다.
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello Dynamic!
      ${lis}
      ${time}
    </body>
  </html>`;
  res.send(output);
});
//동적인 파일은 수정이 반영되지 않는다. 서버 재시작해야한다.

app.get('/login',function(req, res){ // /login 으로 접속시
  res.send("hello login page"); //태그로 감싸서 접근할 수 있다.
});

app.get('/route',function(req, res){ // /login 으로 접속시
  res.send("Hello Route <img src='/test.png'>"); //태그로 감싸서 접근할 수 있다.
});

app.get('/template', function(req,res){
  // res.render('temp', {title: 'first', message:'hello pug template'});
  res.render('temp', {title:'틀딱!',time:Date()});
});

app.get('/topic', function(req,res){
  var topic =[
    'javascript is',
    'express is',
    'nodejs is'
  ];
  var output = `
  <a href="/topic?id=0">javascript</a><br>
  <a href="/topic?id=1">express</a><br>
  <a href="/topic?id=2">nodejs</a><br>
  ${topic[req.query.id]}
  `;
  //req 라는 요청을 받는 객체의 query라는 부분은
  //주소의 ? 뒤에 오는 부분들을 받는 것
  res.send(output);
});

//semantic
app.get('/semantic/:id', function(req,res){
  var topic =[
    'javascript is',
    'express is',
    'nodejs is'
  ];
  var output = `
  <a href="/semantic/0">javascript</a><br>
  <a href="/semantic/1">express</a><br>
  <a href="/semantic/2">nodejs</a><br>
  ${topic[req.params.id]}
  `;
  //의미론적 url 형식에서는 / 구분짓는다.
  //:id 를 받는 것은 params
  res.send(output);
});

//url 에서 모드 바꾸기
app.get('/semantic/:id/:mode', function(req,res){
  res.send(req.params.id+','+req.params.mode);
});

app.get('/form', function(req,res){
  res.render('form');
});

app.get('/form_receiver', function(req,res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});

app.get('/form_post', function(req,res){
  res.render('form_post');
});

app.post('/form_post_receiver', function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});

app.listen(3000, function(){ //port 연결이 완료되면 콜백함수 실행
  console.log('Example app listening on port 3000');
});
