package br.dbcrendimentos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.dbcrendimentos.entity.Cliente;

@RepositoryRestResource
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
