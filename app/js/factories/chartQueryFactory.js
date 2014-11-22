angular.module('sodif').factory('chartQueryFactory', ['$firebase', function($firebase){
  return{
    test: function(firebaseObj, index, firebaseArray){
      console.log('passed array');
      console.log(firebaseArray[index]);
      var tempoObj = {};
      firebaseObj.once('value', function(datEvent){
        var sync = $firebase(firebaseArray[index]);
        tempoObj = {
          x: sync.$ref().path.n[2],
          y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad, ]
        };
        return tempoObj;
      });

    },
  };
}]);
