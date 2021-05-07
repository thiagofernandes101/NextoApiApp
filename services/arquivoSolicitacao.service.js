let config = require('../config.json');
let sql = require('mssql');
let q = require('q');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.getArquivoSolicitacao = getArquivoSolicitacao;
service.getArquivoSolicitacaoById = getArquivoSolicitacaoById;
service.addArquivoSolicitacao = addArquivoSolicitacao;
service.updateArquivoSolicitacao = updateArquivoSolicitacao;
service.deleteArquivoSolicitacao = deleteArquivoSolicitacao;

module.exports = service;

async function getArquivoSolicitacao() {
    let deferred = q.defer();
    try {
        let pool = await sql.connect(databaseConfiguration);
        let arquivoSolicitacao = await pool.request().query("select * from ArquivoSolicitacao");
        return arquivoSolicitacao.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getArquivoSolicitacaoById(ArquivoSolicitacaoId) {
    let deferred = q.defer();
    try {
        let pool = await sql.connect(databaseConfiguration);
        let arquivoSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, ArquivoSolicitacaoId)
            .query("select * from ArquivoSolicitacao where id = @id_parameter");
        return arquivoSolicitacao.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function addArquivoSolicitacao(arquivoSolicitacao) {
    let deferred = q.defer();

    try{
        let pool = await sql.connect(databaseConfiguration);
        let addedArquivoSolicitacao = await pool.request()
            .input('nome_parameter', sql.VarChar, arquivoSolicitacao.Nome)
            .input('solicitacao_parameter', sql.VarChar, arquivoSolicitacao.Solicitacao)
            .input('arquivo_parameter', sql.VarChar, arquivoSolicitacao.Arquivo)
            .input('tipo_parameter', sql.VarChar, arquivoSolicitacao.Tipo)
            .query('insert into ArquivoSolicitacao (nome, solicitacao, arquivo, tipo) values (@nome_parameter, @solicitacao_parameter, @arquivo_parameter, @tipo_parameter)');

        return addedArquivoSolicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateArquivoSolicitacao(arquivoSolicitacao) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedArquivoSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, parseInt(arquivoSolicitacao.Id))
            .input('nome_parameter', sql.VarChar, arquivoSolicitacao.Nome)
            .input('solicitacao_parameter', sql.VarChar, arquivoSolicitacao.Solicitacao)
            .input('arquivo_parameter', sql.VarChar, arquivoSolicitacao.Arquivo)
            .input('tipo_parameter', sql.VarChar, arquivoSolicitacao.Tipo)
            .query('update ArquivoSolicitacao set nome = @nome_parameter, solicitacao = @solicitacao_parameter, arquivo = @arquivo_parameter, tipo = @tipo_parameter where id = @id_parameter');
        
        return updatedArquivoSolicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function deleteArquivoSolicitacao(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let deletedArquivoSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from ArquivoSolicitacao where id = @id_parameter');
        
        return deletedArquivoSolicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}