var express = require('express'); //express를 사용할것을 명시
var app = express();//app 이라는 express 객체를 선언
var bodyParser = require('body-parser');// post로 정보를 보냈을 때 정보를 읽어드리기위한 미들웨어
var fs = require('fs');//파일 관련 미들웨어 선언
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});
app.locals.pretty = true;//html 자동 줄 설정
app.set('views','./views_file'); // view로 사용될 파일 디렉토리 지정
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

app.get('/topic/new', function(req,res){ //글작성화면
  fs.readdir('data', function(err, files){ //fs의 readdir(path, callback)를 통해 파일명들을 읽어드린다.
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render('new', {titles:files}); // error 없이 완료될 경우 view_file 디렉토리의 new.pug에 titles이라는 이름으로 files를 보낸다.
  });
});
// topic/new라는 주소로 접속하였을 때

app.get(['/topic', '/topic/:id'], function(req,res){ // 해당 형태는 배열을 통해 다양한 방식의 라우팅을 지원한다.
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    var id = req.params.id; //semantic url의 형태는 params로 정보를 읽어드린다.
    if(id){ //id 값이 있을 경우
      fs.readFile('data/'+id, 'utf8', function(err, data){ //readfile을 통해 path를 지정하고 해당 파일의 내용을 읽어온다.
        if(err){
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
        res.render('view', {titles:files, title:id, description:data}); // view.pug에 객체들을 mapping하여 전달한다.
      });
    } else{//없을 경우 default를 설정해 화면에 출력한다.
        res.render('view', {titles:files, title:"Welcome", description:'Hello'});
      }
    });
  });

// app.get('/topic/:id', function(req, res){
//
//   //res.send(id);
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     }
//
//   });
// });

app.post('/topic', function(req,res){ //글을 post 방식으로 전달할 때 post를 통해 받아야한다.
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect('/topic/'+title); //완료시 재연결을 통해 등록된 글 화면을 출력한다.
  });
});

app.listen(3005, function(){
  console.log('connect 3005 port');
});
