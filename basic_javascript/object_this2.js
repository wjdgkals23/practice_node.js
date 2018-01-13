var funcThis = null;

function Func(){
  funcThis = this;
}

var o1 = Func();
if(funcThis === global){
  console.log('global');
}

var o2 = new Func(); //생성자 완료 이후 this는 자기자신을 담는다.
if (funcThis===o2) {
  console.log('o2');
}
