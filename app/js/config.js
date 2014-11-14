angular.module('sodif', [
	'firebase',
	'ui.router',
	'ngGrid',
	'angularCharts',
	'ngAnimate',
	'ngDialog'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('login');
	$stateProvider.
	state('login', {
		url: '/login',
		views: {
			body:{
				templateUrl: 'views/login-view.html',
				controller: 'loginCtrl'
			}
		}
	}).
	state('captura',{
		url: '/captura',
		views:{
			menu:{
				templateUrl: 'views/menu-view.html',
				controller: 'menuCtrl'
			},
			body:{
				templateUrl: 'views/captura-view.html',
				controller: 'capturaCtrl'
			}
		},
		resolve:{
			checkLogin: isLoggedIn // function that returns a promise
		}
	}).
	state('oficios',{
		url: '/oficios',
		views:{
			menu:{
				templateUrl: 'views/menu-view.html',
				controller: 'menuCtrl'
			},
			body:{
				templateUrl: 'views/oficios-view.html',
				controller: 'oficiosCtrl'
			}
		},
		resolve:{
			checkLogin: isLoggedIn // function that returns a promise
		}
	}).
	state('grafica',{
		url: '/grafica',
		views:{
			menu:{
				templateUrl: 'views/menu-view.html',
				controller: 'menuCtrl'
			},
			body:{
				templateUrl: 'views/grafica-view.html',
				controller: 'graficaCtrl'
			}
		},
		resolve:{
			checkLogin: isLoggedIn // function that returns a promise
		}
	}).
	state('oficio',{
		url: '/oficios/:year/:month/:numero',
		views:{
			menu:{
				templateUrl: 'views/menu-view.html',
				controller: 'menuCtrl'
			},
			body:{
				templateUrl: 'views/oficio-view.html',
				controller: 'oficioCtrl'
			}
		},
		resolve:{
			checkLogin: isLoggedIn // function that returns a promise
		}
	});
}]);

var isLoggedIn = function($firebaseSimpleLogin, $state, firebaseRefFactory){
	var dataRef = new Firebase(firebaseRefFactory.getMainRef());
	var loginObj = $firebaseSimpleLogin(dataRef);
	loginObj.$getCurrentUser().then(function(user){// this returns a promise
		if(user){
			console.log('Currently logged in as:');
			console.log(loginObj.$getCurrentUser());
			return;
		}
		else{
			// send user to login state/route
			$state.go('login');
		}
	});
};
