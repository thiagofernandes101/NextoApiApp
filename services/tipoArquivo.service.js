let config = require('../config.json');
let sql = require('mssql');
let q = require('q');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addTipoArquivo = addTipoArquivo;
service.getTipoArquivo = getTipoArquivo;
service.getTipoArquivoById = getTipoArquivoById;
service.deleteTipoArquivo = deleteTipoArquivo;
service.updateTipoArquivo = updateTipoArquivo;

module.exports = service;

async function getTipoArquivo() {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let tipoArquivo = await pool.request()
            .query('select * from tipoArquivo');
        
        return tipoArquivo.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getTipoArquivoById(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let tipoArquivo = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from tipoArquivo where id = @id_parameter');
        
        return tipoArquivo.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function addTipoArquivo(tipoArquivo) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedTipoArquivo = await pool.request()
            .input('descricao_parameter', sql.VarChar, tipoArquivo.Descricao)
            .input('sigla_parameter', sql.VarChar, tipoArquivo.Sigla)
            .query('insert into tipoArquivo (descricao, sigla) values (@descricao_parameter, @sigla_parameter)');

        return addedTipoArquivo;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateTipoArquivo(tipoArquivo) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedTipoArquivo = await pool.request()
            .input('id_parameter', sql.Int, tipoArquivo.Id)
            .input('descricao_parameter', sql.VarChar, tipoArquivo.Descricao)
            .input('sigla_parameter', sql.VarChar, tipoArquivo.Sigla)
            .query('update tipoArquivo set descricao = @descricao_parameter, sigla = @sigla_parameter where id = @id_parameter');

        return updatedTipoArquivo;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function deleteTipoArquivo(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let tipoArquivo = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from tipoArquivo where id = @id_parameter');
        
        return tipoArquivo;
    }
    catch (error) {
        throw new Error(error);
    }
}