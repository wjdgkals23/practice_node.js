var vscope = 'global';
function fscope(){
  vscope = 'local2'; // var 선언안하면 함수내에서 전역변수 접근
  console.log(vscope);
}
function fscope2(){
  var vscope = 'local';
  vscope = 'g';
  console.log(vscope);
}
console.log(vscope);
fscope();
console.log(vscope);
fscope2();
console.log(vscope);
