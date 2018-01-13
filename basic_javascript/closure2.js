//함수의 함수 즉 외부함수의 내부함수는 외부함수의 지역변수에 접근 가능하다.
//이후 외부함수의 역할이 종료된 후에도 지역변수에 접근이 가능하다.
function outter(){
  var i = "hello coding";
  return function() {
    console.log(i);
  }
}

inner = outter();
inner();
