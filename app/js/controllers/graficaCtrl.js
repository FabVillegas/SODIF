angular.module('sodif').controller('graficaCtrl', graficaCtrl);

graficaCtrl.$inject = ['$scope', '$state'];

function graficaCtrl($scope, $state){
  $scope.changeState = function(){
    $state.go('login');
  };
};
