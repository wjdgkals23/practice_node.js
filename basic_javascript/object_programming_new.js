// var person = {} //객체 선언
// person.name = 'egoing'; //변수 즉 속성 추가
// person.introduce = function() { //함수 즉 메소드 추가
//   return 'My name is '+this.name;
// }

var person1 = {
  'name' : 'egoing', //변수 즉 속성 추가
  'introduce' : function() { //함수 즉 메소드 추가
    return 'My name is '+this.name;
  }
}; //객체 선언

var person2 = {
  'name' : 'egoing2', //변수 즉 속성 추가
  'introduce' : function() { //함수 즉 메소드 추가
    return 'My name is '+this.name;
  }
}; //객체 선언

console.log(person1.introduce());
console.log(person2.introduce());
 // 중복이 발생된다 이걸 해결할 방안은?
