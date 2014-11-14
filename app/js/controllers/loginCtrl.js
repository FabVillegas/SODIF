angular.module('sodif').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state', '$firebase', '$firebaseSimpleLogin', 'firebaseRefFactory', 'ngDialog'];

function loginCtrl($scope, $state, $firebase, $firebaseSimpleLogin, firebaseRefFactory, ngDialog){

  // instanciar user
  $scope.user = {};

  // crear referencia para loggear junto con obejto login
  var dataRef = new Firebase(firebaseRefFactory.getMainRef());
	$scope.loginObj = $firebaseSimpleLogin(dataRef);

  // ng-click
  $scope.login = function(){
    if($scope.user.name == undefined){
      ngDialog.open({
        template: 'errorMessage',
        closeByDocument: true,
        closeByEscape: true
      });
    }
    else{
      $scope.loginObj.$login("password", {
         email: $scope.user.name,
         password: $scope.user.password
      }).then(function(user) {
         console.log("Logged in as: ", user );
         $state.go('captura');
      }, function(error) {
          ngDialog.open({
            template: 'errorMessage',
            closeByDocument: true,
            closeByEscape: true
          });
          $scope.user.password = '';
         console.error("Login failed: ", error);
      });
    }
  };

};
