function Ultra(){}
  Ultra.prototype.ultraProp = "a";
function Super(){}
  Super.prototype = new Ultra();
function Sub(){}
  var s = new Sub();
  s.ultraProp = 3;
  Sub.prototype = s;

var o = new Sub();
console.log(o.ultraProp);
//prototype chain에 의해 ultraProp라는 값을 순차대로 찾으러 올라간다.
//가장 먼저 탐지되는 값을 리턴한다.
