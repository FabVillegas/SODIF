angular.module('sodif').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state'];

function loginCtrl($scope, $state){
  $scope.login = function(){
    $state.go('oficios');
  };
};
