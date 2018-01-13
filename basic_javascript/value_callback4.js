var numbers = [20,10,9,8,7,6,5,4,3,2,1];
numbers.sort();
console.log(numbers); // 문자로 비교해 버림....

var numbers2 = [20,10,9,8,7,6,5,4,3,2,1];
var sortfunc = function(a,b){
  console.log(a,b);
  return a-b;
}

console.log(numbers2.sort(sortfunc));
