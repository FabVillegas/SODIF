angular.module('sodif').controller('menuCtrl', menuCtrl);

menuCtrl.$inject = ['$scope', '$firebase', '$firebaseAuth', '$state', '$location', 'firebaseRefFactory', 'ngDialog'];

function menuCtrl($scope, $firebase, $firebaseAuth, $state, $location, firebaseRefFactory, ngDialog){


  var checkSelectedLink = function(path){
    switch(path){
      case '/oficios':
        $scope.oficiosView = true;
        break;
      case '/captura':
        $scope.capturaView = true;
        break;
      case '/grafica':
        $scope.graficaView = true;
        break;
    }
  };

  checkSelectedLink($location.path());

  $scope.goCaptura = function(){
    $state.go('captura');
  };

  $scope.goOficios = function(){
    $state.go('oficios');
  };

  $scope.goGrafica = function(){
    $state.go('grafica');
  };

  $scope.logout = function(){
    var dataRef = new Firebase(firebaseRefFactory.getMainRef());
    $scope.loginObj = $firebaseAuth(dataRef);
    console.log("Logged out");
    $scope.loginObj.$unauth()
    $state.go('login');
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
};
