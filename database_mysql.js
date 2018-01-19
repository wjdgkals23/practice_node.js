var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'webdb'
});

conn.connect();

// var sql = 'SELECT * from topic';
// conn.query(sql, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else {
//       for(var i=0; i<rows.length; i++){
//         console.log(rows[i].title, rows[i].description);
//       }
//   }
// });

// var sql = "insert into topic (title,description, author, created) values (?,?,?,?)";
// var params = ['supervisor','watcher','graphittie','2018/4/4'];
// conn.query(sql, params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else {
//     console.log(rows.insertId);
//   }
// });

// var sql = 'update topic set title=?, description=? where id=?';
// var params = ['css','design web page','3'];
// conn.query(sql, params,function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else {
//       console.log(rows);
//   }
// });

var sql = 'delete from topic where id=?';
var params = ['1'];
conn.query(sql, params,function(err, rows, fields){
  if(err){
    console.log(err);
  }else {
      console.log(rows);
  }
});
conn.end();
