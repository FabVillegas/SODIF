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
			checkLogin: isLoggedIn
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
			checkLogin: isLoggedIn
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
			checkLogin: isLoggedIn
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
			checkLogin: isLoggedIn
		}
	});
}]);

var isLoggedIn = function($firebase, $state, firebaseRefFactory){
	var ref = new Firebase(firebaseRefFactory.getMainRef());
	var authData = ref.getAuth();
	if (authData) {
	  console.log("Authenticated user with uid:", authData.uid);
		return;
	}
	else{
		// send user to login state/route
		$state.go('login');
	}
};
