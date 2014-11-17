package br.com.afrcode.iauditor.apresentacao.democont;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.annotation.security.RolesAllowed;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

import org.joda.time.LocalDate;
import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.CategoryAxis;
import org.primefaces.model.chart.ChartSeries;
import org.primefaces.model.chart.LineChartModel;
import org.primefaces.model.chart.LineChartSeries;

import br.com.afrcode.arquitetura.apresentacao.managedbean.AbstractManagedBean;
import br.com.afrcode.arquitetura.util.mensagem.alerta.MensagemAlertaNegocio;
import br.com.afrcode.iauditor.dominio.democont.Conta;
import br.com.afrcode.iauditor.dominio.democont.DemonstrativoConsolidado;
import br.com.afrcode.iauditor.dominio.democont.dao.DaoDemonstrativoConsolidado;
import br.com.afrcode.iauditor.dominio.elasticsearch.ExtendedStats;

import com.ocpsoft.pretty.faces.annotation.URLAction;
import com.ocpsoft.pretty.faces.annotation.URLAction.PhaseId;
import com.ocpsoft.pretty.faces.annotation.URLMapping;
import com.ocpsoft.pretty.faces.annotation.URLMappings;

@ManagedBean
@ViewScoped
@RolesAllowed({ "ROLE_USER" })
@URLMappings(mappings = @URLMapping(id = "viewer.democonsol.init", pattern = "/democonsol/viewer/init/#{mBeanViewerDemoConsol.entidadeAExibir}/#{mBeanViewerDemoConsol.maxStdDeviation}/", viewId = "/web/page/democonsol/viewer/telaViewerDemoConsol.xhtml", outbound = false))
public class MBeanViewerDemoConsol extends AbstractManagedBean {

	private static final String PERIODO_PATTERN = DemonstrativoConsolidado.PERIODO_PATTERN;

	private static final long serialVersionUID = 1L;

	private static final String COD_MSG_CONTA_COM_DESVIO_PADRAO_ACIMA_LIMITE = "conta.desvioPadraoAcimaLimite";

	@ManagedProperty("#{daoDemonstrativoConsolidado}")
	private DaoDemonstrativoConsolidado daoDemonstrativoConsolidado;

	private List<BeanViewerConta> beansViewerContas;

	private String entidadeAExibir;
	// maxStdDeviation a partir de avg
	private BigDecimal maxStdDeviation;

	// TODO tornar atributos abaixo em parâmetros de entrada
	private LocalDate dtMinAExibir = new LocalDate(2010, 3, 31);
	private LocalDate dtMaxAExibir = new LocalDate(2014, 3, 31);

	private void alertarMaxStdDeviationViolation(String labelConta,
			ExtendedStats extendedStats) {
		BigDecimal limiteStdDeviation = extendedStats.getAvg().abs()
				.multiply(maxStdDeviation);
		BigDecimal stdDeviation = extendedStats.getStdDeviation().abs();
		if (stdDeviation.compareTo(limiteStdDeviation) > 0) {
			MensagemAlertaNegocio msg = new MensagemAlertaNegocio();
			msg.setCodMensagem(COD_MSG_CONTA_COM_DESVIO_PADRAO_ACIMA_LIMITE);
			String maxStdDeviationStr = maxStdDeviation
					.multiply(BigDecimal.valueOf(100)).toPlainString()
					.concat("%");
			msg.setArgs(new Object[] { labelConta, maxStdDeviationStr });
			adicionarMensagem(msg);
		}
	}

	private void configurarContaChartModel(Long idConta, String labelConta,
			LineChartModel contaChartModel) {
		contaChartModel.setTitle(labelConta);
		final String legendPosition = "ne";
		contaChartModel.setLegendPosition(legendPosition);
		contaChartModel.setZoom(true);
		final String labelXAxis = "Período";
		Axis xAxis = new CategoryAxis(labelXAxis);
		contaChartModel.getAxes().put(AxisType.X, xAxis);
		Axis yAxis = contaChartModel.getAxis(AxisType.Y);
		final String labelYAxis = "Valores em milhares de Reais";
		yAxis.setLabel(labelYAxis);
	}

	public List<BeanViewerConta> getBeansViewerContas() {
		return beansViewerContas;
	}

	public LocalDate getDtMaxAExibir() {
		return dtMaxAExibir;
	}

	public LocalDate getDtMinAExibir() {
		return dtMinAExibir;
	}

	public String getEntidadeAExibir() {
		return entidadeAExibir;
	}

	public BigDecimal getMaxStdDeviation() {
		return maxStdDeviation;
	}

	@URLAction(mappingId = "viewer.democonsol.init", phaseId = PhaseId.RESTORE_VIEW, onPostback = true)
	public void iniciar() {
		List<DemonstrativoConsolidado> demosConsol = recuperarDemonstrativosConsolidados();
		iniciar(demosConsol);
	}

	private void iniciar(List<DemonstrativoConsolidado> demosConsol) {
		Map<Long, ChartSeries> contasChartSeries = iniciarContasChartSeries(demosConsol);
		iniciarBeansViewerContas(contasChartSeries);
	}

	private void iniciarBeansViewerContas(
			Map<Long, ChartSeries> contasChartSeries) {
		beansViewerContas = new ArrayList<BeanViewerConta>();
		for (Entry<Long, ChartSeries> entry : contasChartSeries.entrySet()) {
			Long idConta = entry.getKey();
			ChartSeries chartSeries = entry.getValue();
			String labelConta = chartSeries.getLabel();

			LineChartModel contaChartModel = new LineChartModel();
			contaChartModel.addSeries(chartSeries);
			configurarContaChartModel(idConta, labelConta, contaChartModel);

			ExtendedStats extendedStats = recuperarExtendedStats(
					entidadeAExibir, dtMinAExibir, dtMaxAExibir, labelConta);
			alertarMaxStdDeviationViolation(labelConta, extendedStats);
			BeanViewerConta beanViewerConta = new BeanViewerConta(labelConta,
					contaChartModel, extendedStats);
			beansViewerContas.add(beanViewerConta);
		}
	}

	private Map<Long, ChartSeries> iniciarContasChartSeries(
			List<DemonstrativoConsolidado> demosConsol) {
		Map<Long, ChartSeries> contasChartSeries = new TreeMap<Long, ChartSeries>();
		for (DemonstrativoConsolidado demoConsol : demosConsol) {
			for (Conta conta : demoConsol.getContas()) {
				Long id = conta.getId();
				String label = conta.getLabel();
				ChartSeries contaChartSeries = contasChartSeries.get(id);
				if (contaChartSeries == null) {
					contaChartSeries = new LineChartSeries(label);
					contasChartSeries.put(id, contaChartSeries);
				}
				LocalDate dt = LocalDate
						.fromDateFields(demoConsol.getPeriodo());
				String dtStr = dt.toString(PERIODO_PATTERN);
				contaChartSeries.set(dtStr, conta.getValor());
			}
		}
		return contasChartSeries;
	}

	private List<DemonstrativoConsolidado> recuperarDemonstrativosConsolidados() {
		List<DemonstrativoConsolidado> demosConsol = daoDemonstrativoConsolidado
				.recuperarDemonstrativosConsolidados(entidadeAExibir,
						dtMinAExibir, dtMaxAExibir);
		return demosConsol;
	}

	private ExtendedStats recuperarExtendedStats(String entidade,
			LocalDate dtMin, LocalDate dtMax, String labelConta) {
		final String field = "valor";
		ExtendedStats extendedStats = daoDemonstrativoConsolidado
				.getExtendedStats(entidade, dtMin, dtMax, labelConta, field);
		return extendedStats;
	}

	public void setDaoDemonstrativoConsolidado(
			DaoDemonstrativoConsolidado daoDemonstrativoConsolidado) {
		this.daoDemonstrativoConsolidado = daoDemonstrativoConsolidado;
	}

	public void setDtMaxAExibir(LocalDate dtMaxAExibir) {
		this.dtMaxAExibir = dtMaxAExibir;
	}

	public void setDtMinAExibir(LocalDate dtMinAExibir) {
		this.dtMinAExibir = dtMinAExibir;
	}

	public void setEntidadeAExibir(String entidadeAExibir) {
		this.entidadeAExibir = entidadeAExibir;
	}

	public void setMaxStdDeviation(BigDecimal maxStdDeviation) {
		this.maxStdDeviation = maxStdDeviation;
	}

}
