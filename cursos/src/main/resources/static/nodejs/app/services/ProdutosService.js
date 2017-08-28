class ProdutosService {
    constructor(connection) {
        this._connection = connection;
    }

    recuperarTodos(callback) {
        this._connection.query('select * from produtos', callback);
    }

    salvar(produto, callback) {
        this._connection.query('insert into produtos set ?', produto, callback);
    }

    remover(produtoId, callback) {
        this._connection.query('delete from produtos where id = ?', produtoId, callback);
    }
}

module.exports = () => ProdutosService;