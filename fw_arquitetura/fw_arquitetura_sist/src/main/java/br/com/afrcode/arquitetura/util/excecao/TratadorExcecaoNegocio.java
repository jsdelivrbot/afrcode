package br.com.afrcode.arquitetura.util.excecao;

import org.apache.commons.lang.Validate;

import br.com.afrcode.arquitetura.util.mensagem.AbstractMensagemNegocio;

/**
 * Tratador de execeções para o tipo específico de exceção ExcecaoNegocio.
 * 
 * 
 */
public class TratadorExcecaoNegocio implements ITratadorExcecao<ExcecaoNegocio> {

	@Override
	public void tratarExcecao(ExcecaoNegocio excecao) {
		Validate.notNull(excecao,
				"Uma instância de ExcecaoNegocio deve ser informada!");
		AbstractMensagemNegocio mensagem = excecao.getMensagem();
		mensagem.tratarMensagem();
	}

}
