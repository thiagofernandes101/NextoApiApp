let config = require('../config.json');
let sql = require('mssql');
let q = require('q');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.getArquivo = getArquivo;
service.getArquivoById = getArquivoById;
service.addArquivo = addArquivo;
service.updateArquivo = updateArquivo;
service.deleteArquivo = deleteArquivo;

module.exports = service;

async function getArquivo() {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let arquivo = await pool.request()
            .query('select * from arquivo');

        return arquivo.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getArquivoById(arquivoId) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let arquivo = await pool.request()
            .input('id_parameter', sql.Int, arquivoId)
            .query('select * from arquivo where id = @id_parameter');

        return arquivo.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function addArquivo(arquivo) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedArquivo = await pool.request()
            .input('arquivo_parameter', sql.VarBinary, arquivo.Arquivo)
            .input('extensao_parameter', sql.VarChar, arquivo.Extensao)
            .input('nome_parameter', sql.VarChar, arquivo.Nome)
            .query('insert into arquivo (arquivo, extensao, nome) values (@arquivo_parameter, @extensao_parameter, @nome_parameter)');

        return addedArquivo.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateArquivo(arquivo) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedArquivo = await pool.request()
            .input('id_parameter', sql.Int, arquivo.Id)
            .input('arquivo_parameter', sql.VarBinary, arquivo.Arquivo)
            .input('extensao_parameter', sql.VarChar, arquivo.Extensao)
            .input('nome_parameter', sql.VarChar, arquivo.Nome)
            .query('update arquivo set arquivo = @arquivo_parameter, extensao = @extensao_parameter, nome = @nome_parameter where id = @id_parameter')

        return updatedArquivo.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function deleteArquivo(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let deleteArquivo = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from arquivo where id = @id_parameter');
        
        return deleteArquivo;
    }
    catch (error) {
        throw new Error(error);
    }
}