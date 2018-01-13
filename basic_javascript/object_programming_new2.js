//생성자는 객체를 만드는 여할
//함수는 객체를 만드는 창조자 역할 까지!?!?

//function Person() {}

// var p = new Person();//함수가 객체같아... 창조자 맞네!
// p.name = 'wjdgkals23';
// p.introduce = function () {
//   return 'My name is '+this.name;
// }

function Person(name) {
  this.name = name;
  this.introduce = function () {
    return 'My name is '+ this.name;
  };
}

var p1 = new Person('정하민'); //생성자를 통해 person 객체를 p1에 초기화한다.
console.log(p1.introduce());
