angular.module('sodif').controller('oficioCtrl', oficioCtrl);

oficioCtrl.$inject = ['$scope', '$firebase', '$state', '$stateParams', 'firebaseRefFactory'];

function oficioCtrl($scope, $firebase, $state, $stateParams, firebaseRefFactory){
  $scope.oficioRef = new Firebase(firebaseRefFactory.getOficio($stateParams.numero));
  $scope.oficioObj = $firebase($scope.oficioRef).$asObject();

  /*
  $scope.capturaRef = new Firebase(firebaseRefFactory.getOficio($stateParams.numero));
  $scope.capturaObj = $firebase($scope.capturaRef).$asObject();
*/
  $scope.capturaRef = new Firebase(firebaseRefFactory.getCaptura($stateParams.year, $stateParams.month, $stateParams.numero));
  $scope.capturaObj = $firebase($scope.capturaRef).$asObject();
  $scope.capturaObj.$loaded().then(function(data){
    console.log($scope.capturaObj.$value);
  });



  $scope.oficio = {};
  $scope.listaMenores = [];

  $scope.isDisabled = true;
  $scope.itExists = -1;

/*
  $scope.oficioObj.$loaded().then(function(){
    $scope.oficio = $scope.oficioObj;
    $scope.listaMenores = $scope.oficioObj.menores;
  });
*/
  $scope.oficioObj.$bindTo($scope, 'objData').then(function(){
    $scope.oficio = $scope.oficioObj;
  }),

  /*
  var ref = new Firebase(URL); // assume value here is { foo: "bar" }
var obj = $firebase(ref).$asObject();

  bj.$bindTo($scope, "data").then(function() {
   console.log($scope.data); // { foo: "bar" }
   $scope.data.foo = "baz";  // will be saved to Firebase
   ref.$set({foo: "baz"});   // this would update Firebase and $scope.data
});
*/

  $scope.disableButtons = function(){
    if($scope.isDisabled){
      $scope.disableStyle = {'background-color':'grey', 'border-color':'black'};
      $scope.eraseMenorDisabled = {'color':'grey'};
    }
    else{
      $scope.disableStyle = {};
      $scope.eraseMenorDisabled = {};
    }
  };

  $scope.enableEdit = function(){
    $scope.isDisabled = false;
    $scope.disableButtons();
  };

  $scope.cancelMenor = function(){
    console.log(1);
  };

  $scope.editOficio = function(){
    console.log($scope.oficio.fecha);
    
  };


  $scope.disableButtons();

};
