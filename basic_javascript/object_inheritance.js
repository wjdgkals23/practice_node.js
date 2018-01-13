// function Person(name) {
//   this.name = name;
//   this.introduce = function () {
//     return 'My name is '+ this.name;
//   };
// }

//생성자로 객체를 선언하는 방식말고 외부에서 선언하는 방식???
//prototype -> 상속을 위한 필수 개념
//객체에는 prototype 이라는 속성이 있다. 해당 속성을 통해 정의한 객체의 속성,메소드는 상속이 가능한 상태가 된다.


function Person(name){
  this.name = name;
}
Person.prototype.name = null;//주의할점 : null 인 이유가 궁금했다.
//일단은 name이라는 것은 생성될 인스턴스마다 다른 이름을 가지기 때문에 null을 줘야한다.
//name은 인스턴스마다 다른 값을 가질거기 때문에 상속받을 객체에서도 따로 선언해주어야한다.
Person.prototype.introduce = function() {
  return 'My name is '+ this.name;
};

var p1 = new Person("하민쨩");
console.log(p1.introduce());

function Programmer(name){
  this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
  return "hello world";
};

var p2 = new Programmer("하민쯩");
console.log(p2.introduce(), p2.coding());
