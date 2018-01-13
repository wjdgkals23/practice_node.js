function sum(arg1,arg2){
  return arg1+arg2;
}

console.log(sum.apply(null, [1,2]));

o1 = {val1:1, val2:2, val3:3, sum:sum2};
o2 = {v1:10, v2:50, v3:100, v4:25, sum:sum2};
//o1 = {val1:1, val2:2, val3:3, sum:sum};
//-> o1.sum();  this가 사용될 조건 또 완성
function sum2(){
  var _sum = 0;
  for(name in this){
    if(typeof this[name] !== 'function'){
    _sum += this[name];
    }
  }
  return _sum;
}
console.log(o1.sum()); //apply로 전달되서 this로 받게 됨.
