//함수에는 arguments 라는 변수에 담긴 숨겨진 유사 배열이 있다.
//이 배열에는 함수를 호출할 때 입력한 인자가 담겨 있다.
function sum() {
  var i, _sum = 0;
  for(i = 0; i<arguments.length; i++){
    console.log(i+" : "+arguments[i]);
    _sum += arguments[i];
  }
  return _sum;
}

console.log(sum(1,2,3,4,5,6,7,8,9,10));
