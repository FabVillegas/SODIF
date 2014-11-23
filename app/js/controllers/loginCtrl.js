angular.module('sodif').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state', '$firebase', '$firebaseAuth', 'firebaseRefFactory', 'ngDialog'];

function loginCtrl($scope, $state, $firebase, $firebaseAuth, firebaseRefFactory, ngDialog){

  // instancias user
  $scope.user = {};

  var dataRef = new Firebase(firebaseRefFactory.getMainRef());
  $scope.authObj = $firebaseAuth(dataRef);

  $scope.closeDialog = function(){
    ngDialog.close({
      template: 'errorMessage',
    });
  };
  // metodos ng-click
  $scope.login = function(){
    if($scope.user.name == undefined){
      ngDialog.open({
        template: 'errorMessage',
        closeByDocument: true,
        closeByEscape: true
      });
    }
    if($scope.user.password != ''){
      $scope.authObj.$authWithPassword({
        email: $scope.user.name,
        password: $scope.user.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $state.go('captura');
      }).catch(function(error) {
        ngDialog.open({
          template: 'errorMessage',
          closeByDocument: true,
          closeByEscape: true
        });
        $scope.user.password = '';
        console.error("Authentication failed:", error);
      });
    }
    else{
      $scope.closeDialog();
    }
  };
};
