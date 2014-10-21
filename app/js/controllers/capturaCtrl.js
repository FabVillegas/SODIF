angular.module('sodif').controller('capturaCtrl', capturaCtrl);

capturaCtrl.$inject = ['$scope', '$state'];

function capturaCtrl($scope, $state){
  $scope.changeState = function(){
    $state.go('login');
  };

  $scope.goOficios = function(){
    $state.go('oficios');
  };

  $scope.goGrafica = function(){
    $state.go('grafica');
  };
};
