//함수의 인자의 개수 체크 - arguments.length
//함수의 매개변수의 개수 체크 - 함수명.length
(function zero(){
  if(zero.length === arguments.length){
  console.log(
    'function.length', zero.length,
    'arguments', arguments.length
  );
}
else {
    console.log();
}
}());
