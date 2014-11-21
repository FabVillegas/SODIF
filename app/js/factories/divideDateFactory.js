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
    },
    getMonthName: function(date){
      var x;
      for(i = 0; i < date.length - 1; i++){
        if(date.substring(i,i+1) == ' ')
          x = i;
      }
      var y = date.substring(0,x);
      return y;
    },
    getNumericMonth: function(date){
      var x;
      for(j = 3; j < date.length - 1; j++){
        if(date.substring(j,j+1) == '/')
          x = j;
      }
      var y = date.substring(3,x);
      return y;
    },
    getNumericYear: function(date){
      var x = date.substring(date.length - 4, date.length);
      return x;
    }
  };
});
