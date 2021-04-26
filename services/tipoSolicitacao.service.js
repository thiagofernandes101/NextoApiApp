let config = require('../config.json');
let sql = require('mssql');
let q = require('q');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addTipoSolicitacao = addTipoSolicitacao;
service.getTipoSolicitacao = getTipoSolicitacao;
service.getTipoSolicitacaoById = getTipoSolicitacaoById;
service.deleteTipoSolicitacao = deleteTipoSolicitacao;
service.updateTipoSolicitacao = updateTipoSolicitacao;

module.exports = service;

async function getTipoSolicitacao() {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let tipoSolicitacao = await pool.request()
            .query('select * from tipoSolicitacao');
        
        return tipoSolicitacao.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function getTipoSolicitacaoById(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let tipoSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from tipoSolicitacao where id = @id_parameter');
        
        return tipoSolicitacao.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function addTipoSolicitacao(tipoSolicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedTipoSolicitacao = await pool.request()
            .input('descricao_parameter', sql.VarChar, tipoSolicitacao.Descricao)
            .input('sigla_parameter', sql.VarChar, tipoSolicitacao.Sigla)
            .query('insert into tipoSolicitacao (descricao, sigla) values (@descricao_parameter, @sigla_parameter)');

        return addedTipoSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function updateTipoSolicitacao(tipoSolicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedTipoSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, tipoSolicitacao.Id)
            .input('descricao_parameter', sql.VarChar, tipoSolicitacao.Descricao)
            .input('sigla_parameter', sql.VarChar, tipoSolicitacao.Sigla)
            .query('update tipoSolicitacao set descricao = @descricao_parameter, sigla = @sigla_parameter where id = @id_parameter');

        return updatedTipoSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function deleteTipoSolicitacao(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let tipoSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from tipoSolicitacao where id = @id_parameter');
        
        return tipoSolicitacao;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}