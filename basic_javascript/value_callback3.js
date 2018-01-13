//배열에 함수를 집어넣어서 메소드처럼 사용하는 방법
var process = [
  function a(input) {return input + 10},
  function b(input) {return input * 10},
  function c(input) {return input / 11}
]

var input = 1;

for(var i=0; i<process.length; i++){
  input = process[i](input);
}

console.log(input);
//각 배열의 인덱스로만 접근이 가능할까 과연?
//console.log(process.a(10));
