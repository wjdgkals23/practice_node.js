var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser('23423452546dafsdf!@#!@#%^&%'));

//cookie란 서버측에서 브라우저 측에 저장해놓은 데이터를 의미한다.
//response header에 set-cookie 부분을 보면 확인 가능하다.
//유저 개개인의 정보유지에 활용될 수 있다.
app.get('/count', function(req, res){
  if(req.cookies.count){
      var count = parseInt(req.cookies.count);
  } else {
      var count = 0;
  }
  res.cookie('count', count+1); //들어온 요청에 대한 응답 count 값을 집어넣는 과정?
  res.send('count : ' + count);
});


// var products = {
//   1:{title:'The history of web 1'},
//   2:{title:'The next web'}
// };
// app.get('/products', function(req,res){
//   var output = '';
//   for(var name in products){
//     output += `<li><a href="/cart/${name}">${products[name].title}</a></li>`;
//     console.log(products[name].title);
//   }
//   res.send(`<h1>Products</h1><ul>${output}</ul>
//       <a href='/cart'>Cart</a>`);
// });
//
// app.get('/cart/:id', function(req,res){
//   var id = req.params.id;
//   if(req.cookies.cart){
//     var cart = req.cookies.cart;
//   } else{
//     var cart = {};
//   }
//   if(!cart[id]){
//     cart[id] = 0;
//   }
//   cart[id] = parseInt(cart[id]+1);
//   res.cookie('cart',cart);
//   var output = '';
//   for(var id in cart){
//     output += `<li>${products[id].title} (${cart[id]})</li>`;
//   }
//   res.send(`<h1>Cart</h1>
//     <ul>${output}</ul>
//     `);
// });
//
// app.get('/cart', function(req,res){
//   var cart = req.cookies.cart;
//   if(!cart){
//     res.send("Empty");
//   } else {
//     var output = '';
//     for(var id in cart){
//       output += `<li>${products[id].title} (${cart[id]})</li>`;
//     }
//   }
//   res.send(`<ul>${output}</ul>`);
// });

app.listen(3003, function(){
  console.log('3003 port connected!!');
});
