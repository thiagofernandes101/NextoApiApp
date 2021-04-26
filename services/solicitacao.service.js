let config = require('../config.json');
let sql = require('mssql');
let q = require('q');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addSolicitacao = addSolicitacao;
service.getSolicitacao = getSolicitacao;
service.getSolicitacaoById = getSolicitacaoById;
service.deleteSolicitacao = deleteSolicitacao;
service.updateSolicitacao = updateSolicitacao;

module.exports = service;

async function getSolicitacao() {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let solicitacao = await pool.request()
            .query('select * from solicitacao');

        return solicitacao.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function getSolicitacaoById(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let solicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from solicitacao where id = @id_parameter');

        return solicitacao.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function addSolicitacao(solicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedSolicitacao = await pool.request()
            .input('nome_parameter', sql.VarChar, solicitacao.Nome)
            .input('sigla_parameter', sql.VarChar, solicitacao.Sigla)
            .input('tipo_parameter', sql.Int, solicitacao.Tipo)
            .input('dataInicio_parameter', sql.DateTime, solicitacao.DataInicio)
            .input('dataFim_parameter', sql.DateTime, solicitacao.DataFim)
            .input('cliente_parameter', sql.Int, solicitacao.Cliente)
            .input('colaborador_parameter', sql.Int, solicitacao.Colaborador)
            .input('status_parameter', sql.Int, solicitacao.Status)
            .query('insert into solicitacao (nome, sigla, tipo, dataInicio, dataFim, cliente, colaborador, status) values (@nome_parameter, @sigla_parameter, @tipo_parameter, @dataInicio_parameter, @dataFim_parameter, @cliente_parameter, @colaborador_parameter, @status_parameter)');

        return addedSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function updateSolicitacao(solicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, solicitacao.Id)
            .input('nome_parameter', sql.VarChar, solicitacao.Nome)
            .input('sigla_parameter', sql.VarChar, solicitacao.Sigla)
            .input('tipo_parameter', sql.Int, solicitacao.Tipo)
            .input('dataInicio_parameter', sql.DateTime, solicitacao.DataInicio)
            .input('dataFim_parameter', sql.DateTime, solicitacao.DataFim)
            .input('cliente_parameter', sql.Int, solicitacao.Cliente)
            .input('colaborador_parameter', sql.Int, solicitacao.Colaborador)
            .input('status_parameter', sql.Int, solicitacao.Status)
            .query('update solicitacao set nome = @nome_parameter, sigla = @sigla_parameter, tipo = @tipo_parameter, dataInicio = @dataInicio_parameter, dataFim = @dataFim_parameter, cliente = @cliente_parameter, colaborador = @colaborador_parameter, status = @status_parameter where id = @id_parameter');

        return updatedSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function deleteSolicitacao(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let solicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from solicitacao where id = @id_parameter');

        return solicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}