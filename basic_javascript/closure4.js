var arr = [];
for(var i = 0; i<5; i++){
  arr[i] = function() {
    return i;
  }
} //i 는 전역변수임  arr에 저장된 5개의 함수는 모두 전역변수 i를 리턴하는 함수임
//console.log(i);

for(var index in arr){
  console.log(arr[index]());
}

console.log("+++++++++++++++++++++");

var arr2 = []
for(var a = 0; a<5; a++){
  arr2[a] = function(id){
    return function(){
      return id;
    }
  }(a); //외부함수가 return하면서 내부함수를 부르기 때문에 return시의 a값이 넘어가고
  //외부함수가 종료되므로 0-4까지 순차적인 값이 들어간다.
}

for(var index2 in arr2){
  console.log(arr2[index2]());
}
