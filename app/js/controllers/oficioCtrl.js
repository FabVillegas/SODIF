angular.module('sodif').controller('oficioCtrl', oficioCtrl);

oficioCtrl.$inject = ['$scope', '$state'];

function oficioCtrl($scope, $state){
  $scope.login = function(){
    $state.go('captura');
  };
};
