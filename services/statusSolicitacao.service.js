let config = require('../config.json');
let sql = require('mssql');
let q = require('q');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addStatusSolicitacao = addStatusSolicitacao;
service.getStatusSolicitacao = getStatusSolicitacao;
service.getStatusSolicitacaoById = getStatusSolicitacaoById;
service.deleteStatusSolicitacao = deleteStatusSolicitacao;
service.updateStatusSolicitacao = updateStatusSolicitacao;

module.exports = service;

async function getStatusSolicitacao() {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let statusSolicitacao = await pool.request()
            .query('select * from statusSolicitacao');
        
        return statusSolicitacao.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function getStatusSolicitacaoById(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let statusSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from statusSolicitacao where id = @id_parameter');
        
        return statusSolicitacao.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function addStatusSolicitacao(statusSolicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedstatusSolicitacao = await pool.request()
            .input('descricao_parameter', sql.VarChar, statusSolicitacao.Descricao)
            .input('sigla_parameter', sql.VarChar, statusSolicitacao.Sigla)
            .query('insert into statusSolicitacao (descricao, sigla) values (@descricao_parameter, @sigla_parameter)');

        return addedstatusSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function updateStatusSolicitacao(statusSolicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedstatusSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, statusSolicitacao.Id)
            .input('descricao_parameter', sql.VarChar, statusSolicitacao.Descricao)
            .input('sigla_parameter', sql.VarChar, statusSolicitacao.Sigla)
            .query('update statusSolicitacao set descricao = @descricao_parameter, sigla = @sigla_parameter where id = @id_parameter');

        return updatedstatusSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function deleteStatusSolicitacao(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let statusSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from statusSolicitacao where id = @id_parameter');
        
        return statusSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}