var app = angular.module('appRendimentos', [ 'ngRoute' ]);

app.config(function($routeProvider, $locationProvider) {
	// $locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl : 'app/views/cliente/list.html',
		controller : 'clienteController',
		resolve : {
			clientes : function($q, $http) {
				var deferred = $q.defer();
				$http({
					method : 'GET',
					url : '/cliente/'
				}).success(function(data, status, headers, config) {
					deferred.resolve(data);
				}).error(function(data, status, headers, config) {
					deferred.reject();
				});
				return deferred.promise;
			},
			cliente : function($q, $http) {
				return "";
			},
			pageType : function($q, $http) {
				return 'list';
			}
		}
	})

	.when('/edit/:id', {
		templateUrl : 'app/views/cliente/edit.html',
		controller : 'clienteController',
		resolve : {
			cliente : function($q, $http) {
				return "";
			},
			clientes : function($q, $http) {
				return "";
			},
			pageType : function($q, $http) {
				return 'edit';
			}
		}
	})

	.when('/new', {
		templateUrl : 'app/views/cliente/edit.html',
		controller : 'clienteController',
		resolve : {
			cliente : function($q, $http) {
				return "";
			},
			clientes : function($q, $http) {
				return "";
			},
			pageType : function($q, $http) {
				return 'new';
			}
		}
	})
	
	
	.otherwise({
		redirectTo : '/'
	});
});