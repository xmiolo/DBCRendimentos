package br.dbcrendimentos.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
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
public class Cliente {
	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private @NonNull String nome;
    private Double rendimentoMensal;
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "endereco")
	private Endereco endereco;
}
