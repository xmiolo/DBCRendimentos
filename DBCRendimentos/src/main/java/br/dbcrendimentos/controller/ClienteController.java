package br.dbcrendimentos.controller;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.dbcrendimentos.entity.Cliente;
import br.dbcrendimentos.repository.ClienteRepository;

@RestController
public class ClienteController {
	private ClienteRepository repository;
	
	public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }
	
	/**
	 * Lista todos Clientes
	 * @return
	 */
	@GetMapping(path = "/cliente", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Cliente> clienteList() {
        return repository.findAll();
    }
	
	/**
	 * Busca cliente por ID
	 * @param id
	 * @return
	 */
	@GetMapping(path = "/cliente/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Optional<Cliente> clienteFind(@PathVariable String id) {
        return repository.findById(Long.parseLong(id));
    }
	
	/**
	 * Inclui e Altera CLiente
	 * @param cliente
	 */
	@PostMapping(path = "/cliente", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void clienteNew(@RequestBody Cliente cliente) {
	    repository.save(cliente);
	}
	
	/**
	 * Exclui cliente
	 * @param clientes
	 */
	@DeleteMapping(path = "/cliente", consumes = MediaType.APPLICATION_JSON_VALUE)
	public void clienteDelete(@RequestBody Collection<Cliente> clientes) {
	    repository.deleteAll(clientes);
	}

}
