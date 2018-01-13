function a() {
  var i=0; //var 생략시 for문이 무한루프가 된다.
}
for(var i=0; i<5; i++){
  a();
  console.log(i);
}
console.log(i);
