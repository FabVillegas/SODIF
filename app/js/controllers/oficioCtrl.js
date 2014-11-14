angular.module('sodif').controller('oficioCtrl', oficioCtrl);

oficioCtrl.$inject = ['$scope', '$firebase', '$state', '$stateParams', 'firebaseRefFactory'];

function oficioCtrl($scope, $firebase, $state, $stateParams, firebaseRefFactory){
  var oficioObj = $firebase(new Firebase(firebaseRefFactory.getTest($stateParams.numero))).$asObject();

  $scope.oficio = {};
  $scope.listaMenores = [];

  $scope.isDisabled = true;
  $scope.itExists = -1;


  oficioObj.$loaded().then(function(){
    console.log(oficioObj.$id);
    console.log('antes ' + $scope.oficio.numero);
    $scope.oficio = oficioObj;
    $scope.listaMenores = oficioObj.menores;
    console.log('despues ' + $scope.oficio.numero);
  });

  $scope.enableEdit = function(){
    $scope.isDisabled = false;
    $scope.disableStyle = {};
  };

  $scope.cancelMenor = function(){
    console.log(1);
  };

  $scope.editOficio = function(){

  };

  $scope.disableButtons = function(){
    if($scope.isDisabled)
      $scope.disableStyle = {'background-color':'grey', 'border-color':'black'};
    else
      $scope.disableStyle = {};
  };

  $scope.disableButtons();

};
