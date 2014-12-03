angular.module('sodif').controller('capturaCtrl', capturaCtrl);

capturaCtrl.$inject = ['$scope', '$firebase', '$state', 'firebaseRefFactory', 'dateFactory', 'ngDialog'];

function capturaCtrl($scope, $firebase, $state, firebaseRefFactory, dateFactory, ngDialog){
  /* Variables auxiliares */
  $scope.itExists = -1;

  $scope.getNumeroControl = function(){
    $scope.numRef = $firebase(new Firebase(firebaseRefFactory.getMainRef() + 'numeroControl')).$asObject();
    $scope.numRef.$watch(function(event){
      $scope.oficio.numero = $scope.numRef.$value;
    });
  };


  $scope.erase = function(){
    $scope.oficio.tipoJuzgado = '';
  };

  /* Instanciar objeto Oficio */
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

  /* Arreglos de menores */
  $scope.listaMenores = [];

  /* agregar menor a lista */
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

  /* agregar menor de lista a arreglo de objetos menores */
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

  $scope.verifyAutoridades = function(capturaYear, capturaMonth, autoridad){
    var createFirstAutoridad = $firebase(new Firebase(firebaseRefFactory.getContadorAutoridadRef(capturaYear, capturaMonth, autoridad))).$asObject();
    createFirstAutoridad.$loaded().then(function(event){
      if(event.$value === null){
        createFirstAutoridad.$value = 0;
        createFirstAutoridad.$save();
        createFirstAutoridad.$destroy();
      }
    });
  };

  $scope.verifyPriorityCounter = function(capturaYear, capturaMonth){
    var createPriorityCounter = $firebase(new Firebase(firebaseRefFactory.getRefToSaveCaptura(capturaYear, capturaMonth) + 'contPrioridad')).$asObject();
    createPriorityCounter.$loaded().then(function(event){
      if(event.$value === null){
        createPriorityCounter.$value = 0;
        createPriorityCounter.$save();
        createPriorityCounter.$destroy();
      }
    });
  };

  $scope.save = function(){
    if($scope.oficio.fecha == undefined || $scope.oficio.numero == undefined){
      ngDialog.open({
        template: 'alertMessage'
      });
    }
    if($scope.oficio.autoridad == 'Autoridad correspondiente' || $scope.oficio.tipoJuzgado == 'Tipo de Juzgado' ||
      $scope.oficio.tipoDeJuicio == 'Tipo de Juicio' || $scope.oficio.municipio == 'Municipio' || $scope.oficio.servicio == 'Servicio' ||
      $scope.oficio.areaDeServicio == 'Area de Servicio' || $scope.oficio.areaDeServicio == 'Area de Servicio' ||
      $scope.oficio.tipoDeServicio == 'Tipo de Servicio'){
      ngDialog.open({
        template: 'missingFieldsMessage'
      });

    }
    else{
      /* incrementar numero de control */
      var numControlRef = new Firebase(firebaseRefFactory.getMainRef() + 'numeroControl');
      numControlRef.transaction(function (cont){
        return (cont || 0) + 1;
      });

      var capturaYear = dateFactory.getYear($scope.oficio.fecha);
      var capturaMonth = dateFactory.getMonth($scope.oficio.fecha);
      /* verificar que contadores de las autoridades y prioridad ya existen, sino, se crean */
      $scope.verifyAutoridades(capturaYear, capturaMonth, 'PGJE');
      $scope.verifyAutoridades(capturaYear, capturaMonth, 'PJE');
      $scope.verifyAutoridades(capturaYear, capturaMonth, 'PJF');
      $scope.verifyPriorityCounter(capturaYear, capturaMonth);
      /* obtener y guardar captura con prioridad, posteriormente aumentar contPrioridad */
      var priorityVal = $firebase(new Firebase(firebaseRefFactory.getRefToSaveCaptura(capturaYear, capturaMonth) + 'contPrioridad')).$asObject();
      var id = $scope.oficio.numero;
      priorityVal.$loaded().then(function(child){
        console.log(priorityVal.$value);
        var capturaRef = new Firebase(firebaseRefFactory.getRefToSaveCaptura(capturaYear, capturaMonth));
        capturaRef.child(id).setWithPriority(true, priorityVal.$value);
      });
      var contPrioridad = new Firebase(firebaseRefFactory.getRefToSaveCaptura(capturaYear, capturaMonth) + 'contPrioridad');
      contPrioridad.transaction(function (cont){
        return (cont || 0) + 1;
      });
      /* guardar a oficios en general */
      var oficioRef = $firebase(new Firebase(firebaseRefFactory.getRefToSaveOficio()));
      oficioRef.$set($scope.oficio.numero, $scope.oficio);
      /* Referencia al contador de todos los oficios */
      var contOficios = new Firebase(firebaseRefFactory.getContadorOficiosRef(capturaYear, capturaMonth));
      /* Incrementa el contador en 1; si no hay alguno establecido, lo crea */
      contOficios.transaction(function(cont){
        return (cont || 0) + 1;
      });
      /* Referencia al contador de todos los menores */
      var contMenores = new Firebase(firebaseRefFactory.getContadorMenoresRef(capturaYear, capturaMonth));
      var menoresEnOficio = $scope.oficio.menores.length; //Numero de menores en el oficio
      contMenores.transaction(function (cont){
        return (cont || 0) + menoresEnOficio;
      });
      /* Referencia al contador de autoridad (PGJE, PJF, PJE) */
      var contAutoridad = new Firebase(firebaseRefFactory.getContadorAutoridadRef(capturaYear, capturaMonth, $scope.oficio.autoridad));
      contAutoridad.transaction(function (cont) {
        return (cont || 0) + 1;
      });
      /* Referencia para contar Juzgados */
      var contJuzgado = new Firebase(firebaseRefFactory.getContadorJuzgadoRef(capturaYear, capturaMonth, $scope.oficio.autoridad, $scope.oficio.tipoJuzgado));
      contJuzgado.transaction(function (cont) {
        return (cont || 0) + 1;
      });
      /* Referencia al contador de juicios */
      var contJuicio = new Firebase(firebaseRefFactory.getContadorJuiciosRef(capturaYear, capturaMonth, $scope.oficio.tipoDeJuicio));
      contJuicio.transaction(function (cont) {
        return (cont || 0) + 1;
      });
      /* Referencia al contador de municipios */
      var contMunicipio = new Firebase(firebaseRefFactory.getContadorMunicipiosRef(capturaYear, capturaMonth, $scope.oficio.municipio));
      contMunicipio.transaction(function (cont) {
        return (cont || 0) + 1;
      });
      /* Referencia al contador de area (psicologia, social, legal) */
      var contArea = new Firebase(firebaseRefFactory.getContadorAreaRef(capturaYear, capturaMonth, $scope.oficio.areaDeServicio));
      contArea.transaction(function (cont) {
        return (cont || 0) + 1;
      });
      /* mensaje de exito */
      ngDialog.open({
        template: 'successMessage',
        closeByDocument: true,
        closeByEscape: true
      });
      /* dar paso a un nuevo oficio */
      $scope.cleanInputs();
    }
  };

  $scope.closeDialog = function(){
    ngDialog.close({
      template: 'successMessage',
      template: 'alertMessage'
    });
  };

  $scope.cleanInputs();
  $scope.getNumeroControl();
};
