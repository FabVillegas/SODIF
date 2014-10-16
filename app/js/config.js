angular.module('sodif', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('login');
	$stateProvider.
	state('login', {
		url: '/login',
		templateUrl: 'views/login-view.html',
		controller: 'loginCtrl'
	}).
	state('captura',{
		url: '/captura',
		templateUrl: 'views/captura-view.html',
		controller: 'capturaCtrl'
	}).
	state('oficio',{
		url: '/oficio',
		templateUrl: 'views/oficio-view.html',
		controller: 'oficioCtrl'
	}).
	state('grafica',{
		url: '/grafica',
		templateUrl: 'views/grafica-view.html',
		controller: 'graficaCtrl'
	}).
	state('second', {
		url: '/second',
		templateUrl: 'views/secondTemplate.html',
		controller: 'secondCtrl'
	});
}]);


var isLoggedIn = function($firebaseSimpleLogin, $state, firebaseRefFactory){
	var dataRef = new Firebase(firebaseRefFactory.getRef());
	var loginObj = $firebaseSimpleLogin(dataRef);
	loginObj.$getCurrentUser().then(function(user){// this returns a promise
		if(user){
			console.log('Logged in as:');
			console.log(loginObj.$getCurrentUser());
			return;
		}
		else{
			// send user to login state/route
			$state.go('login');
		}
	});
};
