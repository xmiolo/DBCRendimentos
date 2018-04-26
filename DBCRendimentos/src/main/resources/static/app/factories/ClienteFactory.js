angular.module('appRendimentos').factory('clienteFactory', function($http) {

	var urlBase = '/cliente';
	var clienteFactory = {};

	clienteFactory.procuraPorId = function(id) {
		return $http({
			method : 'GET',
			url : urlBase + '/' + id + '/'
		});
	};

	clienteFactory.salvar = function(cliente) {
		return $http({
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			url : urlBase,
			data : cliente
		});
	};

	clienteFactory.remove = function(selecionados) {
		console.log(selecionados);
		return $http({
			method : 'DELETE',
			headers : {
				'Content-Type' : 'application/json'
			},
			url : urlBase,
			data : selecionados
		});
	};

	return clienteFactory;
});