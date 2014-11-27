angular.module('sodif').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state', '$firebase', '$firebaseAuth', 'firebaseRefFactory', 'ngDialog'];

function loginCtrl($scope, $state, $firebase, $firebaseAuth, firebaseRefFactory, ngDialog){

  $scope.finished = false;
  // instancias user
  $scope.user = {};


  $scope.dataRef = new Firebase(firebaseRefFactory.getMainRef());
  $scope.authObj = $firebaseAuth($scope.dataRef);

  $scope.closeDialog = function(){
    ngDialog.close({
      template: 'errorMessage',
    });
  };
  // metodos ng-click
  $scope.login = function(){
    if($scope.user.name == undefined || $scope.user.password == undefined){
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

  $scope.changePassword = function(){
    ngDialog.open({
      template: 'changePasswordTemplate',
      scope: $scope,
      closeByDocument: true,
      closeByEscape: true
    });
  };

  $scope.recoverPassword = function(){
    ngDialog.open({
      template: 'recoverPasswordTemplate',
      scope: $scope,
      closeByDocument: true,
      closeByEscape: true
    });
  };

  $scope.sendChangeRequest = function(){
    $scope.dataRef.changePassword({
      email       : $scope.user.name,
      oldPassword : $scope.user.oldPassword,
      newPassword : $scope.user.newPassword
    }, function(error) {
      if (error === null) {
        console.log("Password changed successfully");
        ngDialog.close({
          template: 'changePasswordTemplate',
        });
      } else {
        console.log("Error changing password:", error);
        ngDialog.open({
          template: 'errorMessage',
          closeByDocument: true,
          closeByEscape: true
        });
      }
    });
  };

  $scope.sendRecoverRequest = function(){
    $scope.dataRef.resetPassword({
      email : $scope.user.name
    }, function(error) {
    if (error === null) {
      console.log("Password reset email sent successfully");
      ngDialog.close({
        template: 'recoverPasswordTemplate',
      });
    } else {
      console.log("Error sending password reset email:", error);
      ngDialog.open({
        template: 'errorMessage',
        closeByDocument: true,
        closeByEscape: true
      });
    }
  });
  };
};
