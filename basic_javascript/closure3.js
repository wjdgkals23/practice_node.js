//private variable
function factory_movie(title){
    return {
        get_title : function (){
            return title;
        },
        set_title : function(_title){
          console.log(typeof _title);
          if(typeof _title === 'string'){
            title = _title
          }
          else {
            console.log("문자열 출력");
          }
        }
    }
}

thor = factory_movie("Thor");
beach = factory_movie("beach");

console.log(thor.get_title());
console.log(beach.get_title());
beach.set_title('aa');
console.log(beach.get_title());
