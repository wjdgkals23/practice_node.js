function func() {
  if(global=== this){
    console.log("global === this");
  }
}

func(); // new 를 하지 않으면 nodejs에서의 전역개체인 global객체로 된다.

var o = {
  'func': function(){
    if(o === this){
      console.log("o === this");
    }
  }
}
var p = o;
p.func();
