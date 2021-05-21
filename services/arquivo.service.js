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
service.getArquviosBySolicitacaoId = getArquviosBySolicitacaoId;

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

async function addArquivo(arquivos) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        // let addedArquivo = await pool.request()
        //     .input('arquivo_parameter', sql.VarBinary, arquivo.Arquivo)
        //     .input('extensao_parameter', sql.VarChar, arquivo.Extensao)
        //     .input('nome_parameter', sql.VarChar, arquivo.Nome)
        //     .query('insert into arquivo (arquivo, extensao, nome) values (@arquivo_parameter, @extensao_parameter, @nome_parameter)');

        let table = new sql.Table('arquivo');
        table.create = false;
        table.columns.add('Arquivo', sql.VarBinary, {nullable: true});
        table.columns.add('Extensao', sql.VarChar, {nullable: true});
        table.columns.add('Nome', sql.VarChar, {nullable: true});

        arquivos.forEach(row => {
            table.rows.add(row)
        });

        let addedArquivo = await pool.request().bulk(table);

        return addedArquivo;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateArquivo(arquivo) {
    let deferred = q.defer();

    try {
        let commandSql = `
            update arquivo 
            set arquivo = @arquivo_parameter, 
            extensao = @extensao_parameter, nome = @nome_parameter 
            where id = @id_parameter
            `;

        let pool = await sql.connect(databaseConfiguration);
        let updatedArquivo = await pool.request()
            .input('id_parameter', sql.Int, arquivo.Id)
            .input('arquivo_parameter', sql.VarBinary, arquivo.Arquivo)
            .input('extensao_parameter', sql.VarChar, arquivo.Extensao)
            .input('nome_parameter', sql.VarChar, arquivo.Nome)
            .query(commandSql);

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

async function getArquviosBySolicitacaoId(id) {
    try {
        let commandSql = `
            select Arquivo.Id,
                Arquivo.Arquivo,
                Arquivo.Extensao,
                Arquivo.Nome,
                ArquivoSolicitacao.Solicitacao,
                ArquivoSolicitacao.Tipo
            from Arquivo
            inner join ArquivoSolicitacao
                on ArquivoSolicitacao.Arquivo = Arquivo.Id
            where ArquivoSolicitacao.Solicitacao = @id_parameter
        `;

        let pool = await sql.connect(databaseConfiguration);
        let arquivos = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query(commandSql);
        
        return arquivos.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}