//함수안에 또 함수 선언
function outter(){
  var i = "hello outter function";
  function inner(){
    var j = "hello inner function"
    console.log(i);
    console.log(j);
  }
  inner();
}
outter();
