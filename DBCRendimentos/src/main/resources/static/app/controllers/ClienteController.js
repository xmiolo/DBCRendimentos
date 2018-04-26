/* Setup general page controller */
angular.module('appRendimentos').controller('clienteController', function($http, clientes, cliente, pageType, $scope, $location, clienteFactory, viacepFactory, $routeParams) {
	
	if (pageType == "list") {
		$scope.clientes = clientes;
		console.log('scopo '+$scope.clientes[0]);
	} else if (pageType == "edit") {
		$scope.cliente = procuraPorId($routeParams.id );
	} else if (pageType == "new") {
		$scope.cliente = {"id":null,"nome":null,"rendimentoMensal":null,"risco":null, "endereco":{}};
	}
	
	$scope.selecionados = [];
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   
        $scope.reverse = !$scope.reverse; //Inverte
    }
    
    //Salvar e Editar
    $scope.salvar = function(cliente){
    	console.log("Entrou");
		clienteFactory.salvar(cliente).then(function successCallback(response) {
			$location.path( "/" );
		}, function errorCallback(response) {
			console.log(response);
		});
    };
    
    //Deletar
	$scope.remove = function(selecionados, callback){
		clienteFactory.remove(selecionados).then(function successCallback(response) {
			if (callback)
            	callback(response.data);
			for(i = 0 ; i < selecionados.length ; i++){
    			$scope.clientes.splice($scope.clientes.indexOf(selecionados[i]),1);
    		}
    		$scope.selecionados = [];
    		$location.path( "/" );
        }, function errorCallback(response) {
        	console.log(response);
        });
    };
	
    //Seleciona na lista
	$scope.verificaCheck = function verificaCheck(cliente) {
	    var idx = $scope.selecionados.indexOf(cliente);
	    if (idx > -1) {
	      $scope.selecionados.splice(idx, 1);
	    }
	    else {
	      $scope.selecionados.push(cliente);
	    }
	};
	
	//Excluir
	$scope.action = function(action){
		if(action == "excluir"){
		    var r = confirm("Deseja realmente excluir o dado?");
		    if (r == true) {
		    	$scope.remove($scope.selecionados);
		    } else {
		        return null
		    }
		}
	};

	//Busca Cliente por ID
	function procuraPorId(id){
    	clienteFactory.procuraPorId(id).then(function successCallback(response) {
            $scope.cliente = response.data;
    		return response.data;
        }, function errorCallback(response) {
            console.log(response.status + ' - ' + response.statusText);
        });
	};
	   
	//Marcar todos itens da lista
    $scope.selectAll = function(){
    	if($scope.listAll){
    		return true;
    	} else {
    		return false;
    	}
    };
    
    //Metodo que busca no VIACEP atraves da Factory
    $scope.buscaCep = function(){
    	viacepFactory.buscaCep($scope.cliente.endereco.cep).then(function successCallback(response) {
    		$scope.cliente.endereco.logradouro = response.data.logradouro;
    		$scope.cliente.endereco.uf = response.data.uf;
    		$scope.cliente.endereco.municipio = response.data.localidade;
    		
    		if($scope.cliente.endereco.uf == null){
    			//TODO Mensagem de CEP não encontrado
    		}
    	}, function errorCallback(response) {
    		
    	});
    }
    
    //Abrir modal da Simulacao com Cliente carregado
    $scope.modalSimulacao = function(cliente){
    	$scope.clienteSimulacao = cliente;
    };
    
  //Realiza Simulacao ao mes
    $scope.simulacaoMes = function(){
    	//C //B //A
		if($scope.clienteSimulacao.rendimentoMensal <= 2000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.1 * $scope.clienteSimulacao.duracaoEmprestimo) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		}else if ($scope.clienteSimulacao.rendimentoMensal > 2000 && $scope.clienteSimulacao.rendimentoMensal <= 8000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.05 * $scope.clienteSimulacao.duracaoEmprestimo) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		} else if ($scope.clienteSimulacao.rendimentoMensal > 8000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.019 * $scope.clienteSimulacao.duracaoEmprestimo) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		}
		$scope.clienteSimulacao.totalParcelas = $scope.clienteSimulacao.duracaoEmprestimo;
    };
    
  //Realiza Simulacao ao ano
    $scope.simulacaoAno = function(){
    	//C //B //A
		if($scope.clienteSimulacao.rendimentoMensal <= 2000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.1 * ($scope.clienteSimulacao.duracaoEmprestimo / 12)) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		}else if ($scope.clienteSimulacao.rendimentoMensal > 2000 && $scope.clienteSimulacao.rendimentoMensal <= 8000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.05 * ($scope.clienteSimulacao.duracaoEmprestimo / 12)) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		} else if ($scope.clienteSimulacao.rendimentoMensal > 8000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.019 * ($scope.clienteSimulacao.duracaoEmprestimo / 12)) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		}
		$scope.clienteSimulacao.totalParcelas = $scope.clienteSimulacao.duracaoEmprestimo;
    };
    
  //Realiza Simulacao Vlaor total
    $scope.simulacaoTotal = function(){
    	//C //B //A
		if($scope.clienteSimulacao.rendimentoMensal <= 2000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.1 ) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		}else if ($scope.clienteSimulacao.rendimentoMensal > 2000 && $scope.clienteSimulacao.rendimentoMensal <= 8000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.05 ) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		} else if ($scope.clienteSimulacao.rendimentoMensal > 8000){
			$scope.clienteSimulacao.totalDivida = ($scope.clienteSimulacao.valorEmprestimo * 0.019 ) + $scope.clienteSimulacao.valorEmprestimo;
			$scope.clienteSimulacao.valorParcela = $scope.clienteSimulacao.totalDivida / $scope.clienteSimulacao.duracaoEmprestimo;
			
		}
		$scope.clienteSimulacao.totalParcelas = $scope.clienteSimulacao.duracaoEmprestimo;
    };
    
    //Repetição de parcela
    $scope.geraLista = function(num) {
        return new Array(num);   
    }
});
