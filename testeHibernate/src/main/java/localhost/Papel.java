package localhost;

// Generated 27/09/2011 10:38:52 by Hibernate Tools 3.4.0.CR1

/**
 * Papel generated by hbm2java
 */
public class Papel implements java.io.Serializable {

	private Long id;
	private Long versao;
	private String codigo;
	private String descricao;

	public Papel() {
	}

	public Papel(Long id, String codigo, String descricao) {
		this.id = id;
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public Papel(Long id, Long versao, String codigo, String descricao) {
		this.id = id;
		this.versao = versao;
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getVersao() {
		return this.versao;
	}

	public void setVersao(Long versao) {
		this.versao = versao;
	}

	public String getCodigo() {
		return this.codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}
