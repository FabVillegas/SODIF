angular.module('sodif').controller('capturaCtrl', capturaCtrl);

capturaCtrl.$inject = ['$scope', '$firebase', '$state', 'firebaseRefFactory', 'dateFactory', 'ngDialog'];

function capturaCtrl($scope, $firebase, $state, firebaseRefFactory, dateFactory, ngDialog){
  // Variables auxiliares
  $scope.itExists = -1;
  $scope.toCheckList = [];


  $scope.erase = function(){
    $scope.oficio.tipoJuzgado = '';
  };

  // Instanciar objeto Oficio
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

  // agregar menor de lista a arreglo de objetos menores
  $scope.addMenorToMenores = function(index){
    $scope.oficio.menores.push($scope.listaMenores[index]);
    $scope.listaMenores.splice(index, 1);
  };

  $scope.cancelMenor = function(index){
    $scope.listaMenores.splice(index, 1);
  };

  $scope.cleanInputs = function(){
    $scope.oficio = {
      autoridad: 'Autoridad correspondiente',
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

  $scope.verifyAutoridades = function(autoridad){
    var capturaYear = dateFactory.getYear($scope.oficio.fecha);
    var capturaMonth = dateFactory.getMonth($scope.oficio.fecha);
    var createFirstAutoridad = $firebase(new Firebase(firebaseRefFactory.getContadorAutoridadRef(capturaYear, capturaMonth, autoridad))).$asObject();
    createFirstAutoridad.$loaded().then(function(event){
      if(event.$value === null){
        createFirstAutoridad.$value = 0;
        createFirstAutoridad.$save();
        createFirstAutoridad.$destroy();
      }
    });
  };

  $scope.save = function(){
    if($scope.oficio.fecha == undefined || $scope.oficio.numero == undefined){
      ngDialog.open({
        template: 'alertMessage'
      });
    }
    else{

      $scope.verifyAutoridades('PGJE');
      $scope.verifyAutoridades('PJE');
      $scope.verifyAutoridades('PJF');
      // guardar a capturas por año y mes
      //var capturaRef = $firebase(new Firebase(firebaseRefFactory.getRefToSave(divideDateFactory.getYear($scope.oficio.fecha),divideDateFactory.getMonth($scope.oficio.fecha))));
      var capturaYear = dateFactory.getYear($scope.oficio.fecha);
      var capturaMonth = dateFactory.getMonth($scope.oficio.fecha);

      var capturaRef = $firebase(new Firebase(firebaseRefFactory.getRefToSaveCaptura(capturaYear, capturaMonth)));

      capturaRef.$set($scope.oficio.numero, true);
      // guardar a oficios en general

      var oficioRef = $firebase(new Firebase(firebaseRefFactory.getRefToSaveOficio()));
      oficioRef.$set($scope.oficio.numero, $scope.oficio);

      //Referencia al contador de todos los oficios
      var contOficios = new Firebase(firebaseRefFactory.getContadorOficiosRef(capturaYear, capturaMonth));
      //Incrementa el contador en 1; si no hay alguno establecido, lo crea
      contOficios.transaction(function(cont){
        return (cont || 0) + 1;
      });

      //Referencia al contador de todos los menores
      var contMenores = new Firebase(firebaseRefFactory.getContadorMenoresRef(capturaYear, capturaMonth));
      var menoresEnOficio = $scope.oficio.menores.length; //Numero de menores en el oficio
      contMenores.transaction(function (cont){
        return (cont || 0) + menoresEnOficio;
      });





      //Referencia al contador de autoridad (PGJE, PJF, PJE)
      var contAutoridad = new Firebase(firebaseRefFactory.getContadorAutoridadRef(capturaYear, capturaMonth, $scope.oficio.autoridad));
      contAutoridad.transaction(function (cont) {
        return (cont || 0) + 1;
      });

      //Referencia para contar Juzgados
      var contJuzgado = new Firebase(firebaseRefFactory.getContadorJuzgadoRef(capturaYear, capturaMonth, $scope.oficio.autoridad, $scope.oficio.tipoJuzgado));
      contJuzgado.transaction(function (cont) {
        return (cont || 0) + 1;
      });

      //Referencia al contador de juicios
      var contJuicio = new Firebase(firebaseRefFactory.getContadorJuiciosRef(capturaYear, capturaMonth, $scope.oficio.tipoDeJuicio));
      contJuicio.transaction(function (cont) {
        return (cont || 0) + 1;
      });

      //Referencia al contador de municipios
      var contMunicipio = new Firebase(firebaseRefFactory.getContadorMunicipiosRef(capturaYear, capturaMonth, $scope.oficio.municipio));
      contMunicipio.transaction(function (cont) {
        return (cont || 0) + 1;
      });

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

  $scope.checkOficios = function(){
    $scope.toCheckList = $firebase(new Firebase(firebaseRefFactory.getRefToSaveOficio())).$asArray();
    $scope.toCheckList.$watch(function(child_added){
        $scope.itExists = $scope.toCheckList.$indexFor($scope.oficio.numero);
        if($scope.itExists != -1)
          $scope.disableStyle = {'background-color':'grey', 'border-color':'black'};
        else
          $scope.disableStyle = {};
    });
  };

  $scope.cleanInputs();
};
