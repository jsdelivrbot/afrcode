package com.afrcode.dominio.usuario;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USUARIO")
@SequenceGenerator(name = "ID_GENERATOR", sequenceName = "SEQ_USUARIO")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@EqualsAndHashCode(of = { "id" })
public class Usuario {

	@Version
	private Long versao;

	@GeneratedValue(strategy = GenerationType.AUTO, generator = "ID_GENERATOR")
	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "NOME")
	private String nome;

	@Column(name = "LOGIN")
	private String login;

	public Usuario(String nome, String login) {
		super();
		this.nome = nome;
		this.login = login;
	}

}
