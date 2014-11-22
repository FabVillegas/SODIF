angular.module('sodif').factory('destroyerFactory', ['$firebase', function($firebase){
  return{
    destroyFirebaseReference: function(firebaseObj){
      firebaseObj.off();
    },
    destroyFirebaseObject: function(firebaseObj){
      firebaseObj.$destroy();
    },
  };
}]);
