angular.module('sodif').controller('oficioCtrl', oficioCtrl);

oficioCtrl.$inject = ['$scope', '$firebase', '$state', '$stateParams', 'firebaseRefFactory', 'dateFactory', 'ngDialog'];

function oficioCtrl($scope, $firebase, $state, $stateParams, firebaseRefFactory, dateFactory, ngDialog){
  $scope.oficio = {
    autoridad: '',
    tipoJuzgado : '',
    tipoDeJuicio : '',
    municipio : '',
    servicio : '',
    areaDeServicio : '',
    tipoDeServicio : '',
    menores: []
  };


  $scope.isDisabled = true;
  $scope.itExists = -1;

  $scope.oficioRef = new Firebase(firebaseRefFactory.getOficio($stateParams.numero));
  $scope.oficioObj = $firebase($scope.oficioRef).$asObject();

  $scope.newMenores = 0;

  $scope.oficioObj.$bindTo($scope, 'objData').then(function(){
    $scope.oficio = $scope.oficioObj;

    //$scope.oficio.menores = [];
  }),

  // agregar menor a lista
  $scope.addMenorToList = function(){
    if($scope.oficio.menores == undefined){
      $scope.oficio.menores = [];
    }
    $scope.oficio.menores.push({
      edad: '',
      sexo: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      respuesta: 'Respuesta brindada a petición'
    });
    $scope.newMenores += 1;
  };

  $scope.cancelMenor = function(index){
    $scope.oficio.menores.splice(index, 1);
  };

  $scope.disableButtons = function(){
    if($scope.isDisabled){
      $scope.disableStyle = {'background-color':'grey', 'border-color':'black'};
      $scope.eraseMenorDisabled = {'color':'grey'};
    }
    else{
      $scope.disableStyle = {};
      $scope.eraseMenorDisabled = {};
    }
  };

  $scope.enableEdit = function(){
    $scope.isDisabled = false;
    $scope.disableButtons();
  };

  $scope.editOficio = function(){
    $scope.oficioObj.$save();
    ngDialog.open({
      template: 'editSuccessMessage',
      closeByDocument: true,
      closeByEscape: true
    });
    $scope.isDisabled = true;
    $scope.disableButtons();
    var capturaYear = dateFactory.getYear($scope.oficio.fecha);
    var capturaMonth = dateFactory.getMonth($scope.oficio.fecha);
    /* Referencia al contador de todos los menores */
    var contMenores = new Firebase(firebaseRefFactory.getContadorMenoresRef(capturaYear, capturaMonth));
    var menoresEnOficio =   $scope.newMenores; //Numero de menores en el oficio
    contMenores.transaction(function (cont){
      return (cont || 0) + menoresEnOficio;
    });
  };


  $scope.disableButtons();

};
