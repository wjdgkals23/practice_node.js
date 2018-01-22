var express = require('express');
var session = require('express-session'); //서버의 메모리에 저장되있어서
//종료시 날아감
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false})); //bodyparser 사용을 위한 필수 문장
app.use(session({
  secret: '43521432SAF%$@!134FGD',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('/count', function(req,res){
    if(req.session.count){
      req.session.count++;
    } else{
      req.session.count = 1;
    }
    res.send('result :' + req.session.count);
});
app.get('/tmp', function(req,res){
  res.send('result: ' + req.session.count);
});

app.get('/auth/login', function(req,res){
  var output = `
  <h1>Login</h1>
  <form action='/auth/login' method=post>
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', function(req, res){
  var user = {
    username:'wjdgkals23',
    password:'111',
    displayName:'Wjdgkals'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  if(uname===user.username && pwd===user.password){
      req.session.displayName = user.displayName;
      req.session.save(function(){
          res.redirect("/welcome");
      });
  }else {
    res.send("<a href='/auth/login'>BYE</a>");
  }
});

app.get('/welcome', function(req,res){
  if (req.session.displayName) {
    res.send(`<h1>Hello, ${req.session.displayName}</h1><a href="/auth/logout">logout</a>`);
  }else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `);
  }
});

app.get('/auth/logout',function(req,res){
  delete req.session.displayName;
  req.session.save(function(){
      res.redirect("/welcome");
  });
});

app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});
