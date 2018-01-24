var express = require('express');
var session = require('express-session'); //서버의 메모리에 저장되있어서
//종료시 날아감
var md5 = require('sha256');
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

var users = [
  {
    username:'wjdgkals23',
    password: '5ade3064485b78ef25a4f28f98188184',
    salt: '!@#$#@$!#%$!#$13451345',
    displayName:'Wjdgkals'
  },
  {
    username:'wjdgkals',
    password: '7d9e06487e827c74fbe83dd787b07348',
    salt: '@#$@$%$^#$%^$%33332',
    displayName:'Wjdgk'
  }
];

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

app.post('/auth/register', function(req,res){
  var user = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName
  };
  users.push(user);
  req.session.displayName = req.body.displayName;
  req.session.save(function(){
      res.redirect('/welcome');
  });
});

app.get('/auth/register', function(req,res){
  var output = `
  <h1>Register</h1>
  <form action='/auth/register' method=post>
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="text" name="displayName" placeholder="displayName">
    </p>

    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', function(req, res){
  var uname = req.body.username;
  var pwd = req.body.password;
  for(var i=0; i<users.length; i++){
    var user = users[i];
    if(uname===user.username && md5(pwd+user.salt)===user.password){
        req.session.displayName = user.displayName;
        return req.session.save(function(){
            res.redirect("/welcome");
        });
    }
  }
    res.send("<a href='/auth/login'>BYE</a>");
});

app.get('/welcome', function(req,res){
  if (req.session.displayName) {
    res.send(`<h1>Hello, ${req.session.displayName}</h1><a href="/auth/logout">logout</a>`);
  }else {
    res.send(`
      <h1>Welcome</h1>
      <p><a href="/auth/login">Login</a></p>
      <p><a href="/auth/register">Register</a></p>
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
