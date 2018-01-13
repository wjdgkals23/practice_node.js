(function (){
  var MYAPP = {};
  MYAPP.calculator = {
    'left':null,
    'right':null
  };
  MYAPP.coordinate ={
    'left':null,
    'right':null
  };

  MYAPP.calculator.left = 10;
  MYAPP.calculator.right = 20;
  function sum(){
    return MYAPP.calculator.left + MYAPP.calculator.right;
  }
  console.log(sum());
}()); //익명함수 실행으로 전역변수를 하지않고 코드실행이 가능하다.
