package cursojsf.modelo.entidade.chamado.dao;

import org.jboss.seam.annotations.intercept.BypassInterceptors;
import org.springframework.stereotype.Repository;

import cursojsf.modelo.entidade.chamado.Chamado;
import cursojsf.modelo.entidade.dao.DaoJpaAbstrato;

/**
 * 
 * @author alysson
 *
 */
@BypassInterceptors
@Repository
public class DaoChamado extends DaoJpaAbstrato<Chamado> {

}
