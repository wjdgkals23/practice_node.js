var express = require('express'); //express를 사용할것을 명시
var app = express();//app 이라는 express 객체를 선언
var bodyParser = require('body-parser');// post로 정보를 보냈을 때 정보를 읽어드리기위한 미들웨어
var fs = require('fs');//파일 관련 미들웨어 선언
var mysql      = require('mysql'); //node-mysql을 통해 nodejs 와 mysql을 연결
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pcb080bdk??',
  database : 'webdb'
}); //mysql 정보 입력
conn.connect();// conn은 연결객체로 질의를 할 때 사용
var multer = require('multer'); // 파일업로드 미들웨어
var storage = multer.diskStorage({ //multer의 storage 속성 지정
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //저장소 지정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //저장 이름 지정
  }
});
var upload = multer({storage: storage}); //multer에 storage 속성을 가지는 upload 객체 선언
app.locals.pretty = true;//html 자동 줄 설정
app.set('views','./views_mysql'); // view로 사용될 파일 디렉토리 지정
app.set('view engine','pug');//view engine 으로 pug 사용
app.use(bodyParser.urlencoded({extended:false})); //bodyparser 사용을 위한 필수 문장
app.use('/users', express.static('uploads'));

app.get('/upload', function(req,res){
  fs.readdir('uploads', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render('upload', {lists:files});
  });
});

app.post('/upload', upload.single('userfile'), function(req,res){
  //upload.single('form 태그의 name의 값') 을 통해 req에 file이라는 속성에 업로드한 파일의 정보가 들어간다.
  console.log(req.file);
  res.redirect('/upload/');
});

app.get('/topic/add', function(req,res){ //글작성화면
  var sql = "SELECT id,title from topic"; //view.pug에서 사용될 데이터 쿼리
  conn.query(sql, function(err, out_rows, fields){
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render('add', {titles:out_rows}); //정보 전송
  });
});

app.post('/topic/add', function(req,res){ //글을 post 방식으로 전달할 때 post를 통해 받아야한다.
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var dt = new Date();
  var date = dt.getFullYear()+'/'+(dt.getMonth()+1)+'/'+dt.getDate();
  var sql = "INSERT INTO topic (title, description, author, created) VALUES(?,?,?,?)";
  conn.query(sql,[title,description,author, date], function(err,result,fields){
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }else {
      res.redirect('/topic/'+result.insertId);
    }
  });
  //fs.writeFile('data/'+title, description, function(err){
});

app.get(['/topic/:id/edit'], function(req,res){ // 해당 형태는 배열을 통해 다양한 방식의 라우팅을 지원한다.
  var sql = "SELECT id,title from topic";
  conn.query(sql, function(err, out_rows, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, in_rows, fields){
        if(err){
          console.log(err);
           res.status(500).send("Internal Server Error");
        } else {
          res.render('edit', {titles:out_rows,title:in_rows[0]}); // view.pug에 객체들을 mapping하여 전달한다.
        }
      });
    }else {
      console.log('No id');
      res.status(500).send("Internal Server Error");
    }
  });
});

app.post(['/topic/:id/edit'], function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
  conn.query(sql, [title,description,author,id], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else{
      res.redirect('/topic/'+id);
    }
  });
});

app.get(['/topic/:id/delete'], function(req,res){
  var out_sql = "SELECT id,title from topic";
  var id = req.params.id;
  conn.query(out_sql, function(err, topics, fields){
    var in_sql = 'SELECT * FROM topic WHERE id=?';
    conn.query(in_sql, [id], function(err, topic){
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        if (topic.length == 0) {
          console.log('there is no id');
          res.status(500).send("Internal Server Error");
        }else {
          res.render('delete', {titles:topics, topic:topic[0]});
        }
      }
    });
  });
});

app.post(['/topic/:id/delete'], function(req,res){
  var id = req.params.id;
  var sql = "DELETE FROM topic WHERE id=?";
  conn.query(sql, [id], function(err, result){
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect('/topic');
    }
  });
});


app.get(['/topic', '/topic/:id'], function(req,res){ // 해당 형태는 배열을 통해 다양한 방식의 라우팅을 지원한다.
  var sql = "SELECT id,title from topic";
  conn.query(sql, function(err, out_rows, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, in_rows, fields){
        if(err){
          console.log(err);
           res.status(500).send("Internal Server Error");
        } else {
          res.render('view', {titles:out_rows,title:in_rows[0]}); // view.pug에 객체들을 mapping하여 전달한다.
        }
      });
    }else {
      res.render('view', {titles:out_rows}); // view.pug에 객체들을 mapping하여 전달한다.
    }
  });
});


app.listen(3005, function(){
  console.log('connect 3005 port');
});
