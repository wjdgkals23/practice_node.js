// 속성과 메소드(javascript 에선 함수는 값이 될 수 있다
a = {
  b:function(){
    console.log("b function in a object");
  }
};
a.b();

//함수는 다른 함수를 인자로 받을 수 있다.

function cal(func, num){
  return func(num);
}

function increase(num){
  return num+1;
}

console.log(cal(increase,1));
