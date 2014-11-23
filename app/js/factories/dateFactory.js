angular.module('sodif').factory('dateFactory', ['ngDialog', function(ngDialog){
  return{
    getMonth: function(date){
      var x;
      for(var i = 3; i < date.length - 1; i++){
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
    getNumericMonth: function(date){
      var x;
      for(var j = 3; j < date.length - 1; j++){
        if(date.substring(j,j+1) == '/')
          x = j;
      }
      var y = date.substring(3,x);
      return y;
    },
    getNumericYear: function(date){
      var x = date.substring(date.length - 4, date.length);
      return x;
    },
    getMonthsRange: function(from, to){
      var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
      var arr = [];
      var datFrom = new Date();
      datFrom.setDate(1);
      datFrom.setMonth(parseInt(this.getNumericMonth(from)) - 1);
      datFrom.setFullYear(parseInt(this.getNumericYear(from)));
      var datTo = new Date();
      datTo.setDate(1);
      datTo.setMonth(parseInt(this.getNumericMonth(to) - 1));
      datTo.setFullYear(parseInt(this.getNumericYear(to)));
      if(datTo < datFrom){
        ngDialog.open({ template: 'mesesMessage' });
      }
      var fromYear =  datFrom.getFullYear();
      var toYear =  datTo.getFullYear();
      var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();
      for (var i = datFrom.getMonth(); i <= diffYear; i++) {
          arr.push(monthNames[i%12] + " " + Math.floor(fromYear+(i/12)));
      }
      return arr;
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
  };
}]);
