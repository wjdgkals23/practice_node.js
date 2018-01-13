//유효범위의 시작은 함수가 선언될 때 유효범위를 갖는다.
// 정의될 때 유효범위!!!!
var i = 5;

function a() {
  b();
  i = 10;
}

function b(){
  console.log(i);
}

a();
console.log(i);
