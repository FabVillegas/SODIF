angular.module('sodif').factory('divideDateFactory', function(){
  return{
    getMonth: function(date){
      var x;
      for(i = 3; i < date.length - 1; i++){
        if(date.substring(i,i+1) == ' ')
          x = i;
      }
      var y = date.substring(3,x);
      return y;
    },
    getYear: function(date){
      var x = date.substring(date.length - 4, date.length);
      return x;
    }
  };
});
