angular.module('sodif').controller('menuCtrl', menuCtrl);

menuCtrl.$inject = ['$scope', '$firebase', '$firebaseAuth', '$state', '$location', 'firebaseRefFactory'];

function menuCtrl($scope, $firebase, $firebaseAuth, $state, $location, firebaseRefFactory){


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
};
