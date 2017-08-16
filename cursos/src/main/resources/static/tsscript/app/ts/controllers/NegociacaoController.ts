import { DateHelper } from "../helpers/DateHelper";
import { Mensagem } from "../models/Mensagem";
import { NegociacaoExt } from "../models/NegociacaoExt";
import { Negociacao } from "../models/Negociacao";
import { NegociacoesList } from "../models/NegociacoesList";
import { NegociacoesView} from "../views/NegociacoesView";
import { MensagemView } from "../views/MensagemView";
import { dom } from "../helpers/dom";
import { throttle } from "../helpers/throttle";
export class NegociacaoController {
    @dom("#data")
    private _inputData: JQuery;
    @dom("#quantidade")
    private _inputQuantidade: JQuery;
    @dom("#valor")
    private _inputValor: JQuery;
    private _negociacoesList = new NegociacoesList();
    private _negociacoesView: NegociacoesView;
    private _mensagemView: MensagemView;
    private _ordemAtual = "";

    constructor() {
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._negociacoesList);
        this._mensagemView = new MensagemView($("#mensagemView"));
    }

    adiciona(event: Event) {
        event.preventDefault();
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.val()),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        this._negociacoesList.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoesList);
        this._mensagemView.update(new Mensagem("Negociação incluída com sucesso!"));
        this._reset();
    }

    @throttle()
    importaDados() {
        function _handleError(result : Response) {
            if (!result.ok) throw new Error(result.statusText);
            return result;
        }
        fetch("http://localhost:8080/dados")
            .then(result => _handleError(result))
            .then(result => result.json())
            .then((dados: NegociacaoExt[]) => {
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoesList.adiciona(negociacao))
                this._negociacoesView.update(this._negociacoesList);
            });
    }

    private _reset() {
        this._inputData.val("");
        this._inputQuantidade.val("1");
        this._inputValor.val("0.0");
        this._inputData.focus();
    }

}