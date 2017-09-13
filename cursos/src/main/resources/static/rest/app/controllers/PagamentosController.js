class PagamentosController {
    constructor(app) {
        this._app = app;
    }

    _handleError(error, next) {
        if (error) {
            console.log(error);
            next(error);
        }
        return error;
    }

    recuperarTodos(request, response, next) {
        let connection = this._app.services.connectionFactory();
        let pagamentosService = new this._app.services.PagamentosService(connection);
        pagamentosService.recuperarTodos((error, result) => {
            if (this._handleError(error, next)) return;
            response.json(result);
        });
        connection.end();
    }

    _validar(request) {
        request.assert('valor', 'Valor não é um número decimal válido (999.99)!')
            .isFloat();
        request.assert('descricao', 'Descrição é obrigatória!').notEmpty();
        request.assert('data', 'Data é obrigatória!').notEmpty();
        return request.validationErrors();
    }

    confirmar(request, response, next) {
        let connection = this._app.services.connectionFactory();
        let pagamentosService = new this._app.services.PagamentosService(connection);
        pagamentosService.recuperarPorId(request.params.pagamentoId, (error, result) => {
            if (this._handleError(error, next)) return;
            let pagamento = result[0];
            console.log(pagamento);
            pagamento.status = 1;
            pagamentosService.salvar(pagamento, (error, result) => {
                if (this._handleError(error, next)) return;
                response.json(pagamento);
            });
            connection.end();
        });
    }

    salvar(request, response, next) {
        let pagamento = request.body;
        let errors = this._validar(request);
        if (errors) {
            response.status(400).json(errors)
            return;
        }
        
        let connection = this._app.services.connectionFactory();
        let pagamentosService = new this._app.services.PagamentosService(connection);
        pagamentosService.salvar(pagamento, (error, result) => {
            if (this._handleError(error, next)) return;
            response.json(pagamento);
        });
        connection.end();
    }

    remover(request, response, next) {
        let connection = this._app.services.connectionFactory();
        let pagamentosService = new this._app.services.PagamentosService(connection);
        let pagamentoId = request.params.pagamentoId;
        pagamentosService.remover(pagamentoId, (error, result) => {
            if (this._handleError(error, next)) return;
            response.json({
                id: pagamentoId,
                msg: `Pagamento id[${pagamentoId}] removido com sucesso!`
            });
        });
        connection.end();
    }

    recuperarPorId(request, response, next) {
        let connection = this._app.services.connectionFactory();
        let pagamentosService = new this._app.services.PagamentosService(connection);
        pagamentosService.recuperarPorId(request.params.pagamentoId, (error, result) => {
            if (this._handleError(error, next)) return;
            response.json(result[0]);
        });
        connection.end();
    }
}

module.exports = () => PagamentosController;