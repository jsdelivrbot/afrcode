'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = function (_View) {
	_inherits(NegociacoesView, _View);

	function NegociacoesView() {
		_classCallCheck(this, NegociacoesView);

		return _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).apply(this, arguments));
	}

	_createClass(NegociacoesView, [{
		key: 'template',
		value: function template(model) {
			return '\n\t\t    <table class="table table-hover table-bordered">\n\t\t        <thead>\n\t\t            <tr>\n\t\t                <th onclick="negociacaoController.ordena(\'data\')">DATA</th>\n\t\t                <th onclick="negociacaoController.ordena(\'quantidade\')">QUANTIDADE</th>\n\t\t                <th onclick="negociacaoController.ordena(\'valor\')">VALOR</th>\n\t\t                <th onclick="negociacaoController.ordena(\'volume\')">VOLUME</th>\n\t\t            </tr>\n\t\t        </thead>\n\t\t        \n\t\t        <tbody>\n\t\t            ' + model.negociacoes.map(function (negociacao) {
				return '\n\t\t                    <tr>\n\t\t                        <td>' + DateHelper.dataParaTexto(negociacao.data) + '</td>\n\t\t                        <td>' + negociacao.quantidade + '</td>\n\t\t                        <td>' + negociacao.valor + '</td>\n\t\t                        <td>' + negociacao.volume + '</td>\n\t\t                    </tr>\n\t\t                ';
			}).join('') + '\n\t\t        </tbody>\n\t\t        \n\t\t        <tfoot>\n\t\t            <td colspan="3"></td>\n\t\t            <td>\n\t\t            \t' + model.volumeTotal + '\n\t\t            </td>\n\t\t        </tfoot>\n\t\t    </table>\n\t\t';
		}
	}]);

	return NegociacoesView;
}(View);
//# sourceMappingURL=NegociacoesView.js.map