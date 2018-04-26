package br.dbcrendimentos.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


/**
 * @author Gregori R. Bedin
 * @version 1.0
 */
@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class Endereco implements java.io.Serializable{

	private static final long serialVersionUID = -8979912903366334693L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String cep;
	private String logradouro;
	private String numero;
	private String bairro;
	private String uf;
	private String complemento;
	private String municipio;

	public Endereco(Long id, String cep, String logradouro, String numero, String bairro, String uf, String complemento,
			String municipio) {
		this.id = id;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.bairro = bairro;
		this.uf = uf;
		this.complemento = complemento;
		this.municipio = municipio;
	}

	/*public Endereco(String stringJSON) {
		Gson gson = new Gson();
		Endereco endereco = gson.fromJson(stringJSON, Endereco.class);
		this.id = endereco.id;
		this.cep = endereco.cep;
		this.logradouro = endereco.logradouro;
		this.numero = endereco.numero;
		this.bairro = endereco.bairro;
		this.uf = endereco.uf;
		this.complemento = endereco.complemento;
		this.municipio = endereco.municipio;
	}*/
}
