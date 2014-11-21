angular.module('sodif').factory('chartQueryFactory', function(){
  return{
    test: function(){
      
      $scope.testRef.orderByChild('val').on('child_added', function(snapshot){
        var firstRef = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable)).$asArray();
        firstRef.$watch(function(event){
          var secondRef = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable + '/' + event.key)).$asArray();
          secondRef.$watch(function(snap){
            console.log('secondREf');
            var x = 'https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable + '/' + event.key + '/' + snap.key;
            console.log(x.toString());
            $scope.thirdRef = $firebase(new Firebase(x)).$asObject();
            $scope.thirdRef.$loaded().then(function(child){
              console.log(child.$id);
              console.log(child.$value);
              if(child.$id != 'contAutoridad'){
                $scope.checkList.push({
                  name: child.$id,
                  value: child.$value
                });
              }
            });
          });
        });
        $scope.monthsArray.push({
          x: snapshot.key(),
          y: [snapshot.val().autoridad.PGJE.contAutoridad, snapshot.val().autoridad.PJE.contAutoridad, snapshot.val().autoridad.PJF.contAutoridad]
        });
      });

    }
  };
});
