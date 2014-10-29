angular.module('sodif').controller('capturaCtrl', capturaCtrl);

capturaCtrl.$inject = ['$scope', '$firebase', '$state', 'firebaseRefFactory', 'ngDialog'];

function capturaCtrl($scope, $firebase, $state,firebaseRefFactory, ngDialog){

  // Funciones auxiliares
  var getMonth = function(fecha){
    var x;
    for(i = 3; i < fecha.length - 1; i++){
      if(fecha.substring(i,i+1) == ' ')
        x = i;
    }
    var y = fecha.substring(3,x);
    return y;
  };

  var getYear = function(fecha){
    var x = fecha.substring(fecha.length - 4, fecha.length);
    return x;
  };

  // Instanciar objeto Oficio
  $scope.oficio = {
    autoridad : 'Autoridad correspondiente',
    tipoJuzgado : 'Tipo de Juzgado',
    tipoDeJuicio : 'Tipo de Juicio',
    municipio : 'Municipio',
    servicio : 'Servicio',
    areaDeServicio : 'Area de Servicio',
    tipoDeServicio : 'Tipo de Servicio',
    menores: []
  };

  // Arreglos de menores
  $scope.listaMenores = [];

  // agregar menor a lista
  $scope.addMenorToList = function(){
    $scope.listaMenores.push({
      edad: '',
      sexo: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      respuesta: 'Respuesta brindada a petición'
    });
  };

  // agregar menor de lista a arreglo de objectos menores
  $scope.addMenorToMenores = function(index){
    $scope.oficio.menores.push($scope.listaMenores[index]);
    $scope.listaMenores.splice(index, 1);
  };

  $scope.cancelMenor = function(index){
    $scope.listaMenores.splice(index, 1);
  };


  $scope.guardar = function(){
    if($scope.oficio.fecha == undefined || $scope.oficio.numero == undefined){
      ngDialog.open({
        template: 'alertMessage'
      });
    }
    else{
      var month = getMonth($scope.oficio.fecha);
      var year = getYear($scope.oficio.fecha);
      var ref = $firebase(new Firebase(firebaseRefFactory.getRefToSave(month,year)));
      ref.$set($scope.oficio.numero, $scope.oficio);

      ngDialog.open({
        template: 'successMessage',
        closeByDocument: true,
        closeByEscape: true
      });

      $scope.cleanInputs();
    }
  };

  $scope.closeDialog = function(){
    ngDialog.close({
      template: 'successMessage',
      template: 'alertMessage'
    });
  };

  $scope.cleanInputs = function(){
    $scope.oficio = {
      autoridad : 'Autoridad correspondiente',
      tipoJuzgado : 'Tipo de Juzgado',
      tipoDeJuicio : 'Tipo de Juicio',
      municipio : 'Municipio',
      servicio : 'Servicio',
      areaDeServicio : 'Area de Servicio',
      tipoDeServicio : 'Tipo de Servicio',
      menores: []
    };

    $scope.listaMenores = [];
  };

};
