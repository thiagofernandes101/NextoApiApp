let config = require('../config.json');
let sql = require('mssql');

let usuarioService = require('./usuario.service');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addFormulario = addFormulario;
service.getFormulario = getFormulario;
service.getFormularioById = getFormularioById;
service.deleteFormulario = deleteFormulario;
service.updateFormulario = updateFormulario;
service.getFormularioBySolicitacao = getFormularioBySolicitacao;

module.exports = service;

async function getFormulario() {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let formulario = await pool.request()
            .query('select * from formulario');

        await getNodeResponsavel(formulario.recordset);

        return formulario.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getNodeResponsavel(formulario) {
    for (let formularioIndex = 0; formularioIndex < formulario.length; formularioIndex++) {
        let responsavel = await usuarioService.getUsuarioById(formulario[formularioIndex].Responsavel);
        formulario[formularioIndex].Responsavel = responsavel[0];
    }
}

async function getFormularioById(id) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let formulario = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from formulario where id = @id_parameter');

        await getNodeResponsavel(formulario.recordset);

        return formulario.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function addFormulario(formulario) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedFormulario = await pool.request()
            .input('solicitacao_parameter', sql.Int, formulario.Solicitacao)
            .input('enviado_parameter', sql.DateTime, formulario.Enviado)
            .input('responsavel_parameter', sql.Int, formulario.Responsavel.Id)
            .input('nome_parameter', sql.VarChar, formulario.Nome)
            .input('retorno_parameter', sql.VarChar, formulario.Retorno)
            .input('campoAplicacao_parameter', sql.VarChar, formulario.CampoAplicacao)
            .input('fundamentosInvencao_parameter', sql.VarChar, formulario.FundamentosInvencao)
            .input('estadoTecnica_parameter', sql.VarChar, formulario.EstadoTecnica)
            .input('problemas_parameter', sql.VarChar, formulario.Problemas)
            .input('solucaoInvencao_parameter', sql.VarChar, formulario.SolucaoInvencao)
            .input('vantagens_parameter', sql.VarChar, formulario.Vantagens)
            .input('descricaoDesenhos_parameter', sql.VarChar, formulario.DescricaoDesenhos)
            .input('descricaoInvencao_parameter', sql.VarChar, formulario.DescricaoInvencao)
            .query('insert into formulario (solicitacao, enviado, responsavel, nome, retorno, campoAplicacao, fundamentosInvencao, estadoTecnica, problemas, solucaoInvencao, vantagens, descricaoDesenhos, descricaoInvencao) values (@solicitacao_parameter, @enviado_parameter, @responsavel_parameter, @nome_parameter, @retorno_parameter, @campoAplicacao_parameter, @fundamentosInvencao_parameter, @estadoTecnica_parameter, @problemas_parameter, @solucaoInvencao_parameter, @vantagens_parameter, @descricaoDesenhos_parameter, @descricaoInvencao_parameter)')

        return addedFormulario;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateFormulario(formulario) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedFormulario = await pool.request()
            .input('id_parameter', sql.Int, formulario.Id)
            .input('solicitacao_parameter', sql.Int, formulario.Solicitacao)
            .input('enviado_parameter', sql.DateTime, formulario.Enviado)
            .input('responsavel_parameter', sql.Int, formulario.Responsavel)
            .input('nome_parameter', sql.VarChar, formulario.Nome)
            .input('retorno_parameter', sql.VarChar, formulario.Retorno)
            .input('campoAplicacao_parameter', sql.VarChar, formulario.CampoAplicacao)
            .input('fundamentosInvencao_parameter', sql.VarChar, formulario.FundamentosInvencao)
            .input('estadoTecnica_parameter', sql.VarChar, formulario.EstadoTecnica)
            .input('problemas_parameter', sql.VarChar, formulario.Problemas)
            .input('solucaoInvencao_parameter', sql.VarChar, formulario.SolucaoInvencao)
            .input('vantagens_parameter', sql.VarChar, formulario.Vantagens)
            .input('descricaoDesenhos_parameter', sql.VarChar, formulario.DescricaoDesenhos)
            .input('descricaoInvencao_parameter', sql.VarChar, formulario.DescricaoInvencao)
            .query('update formulario set solicitacao = @solicitacao_parameter, enviado = @enviado_parameter, responsavel = @responsavel_parameter, nome = @nome_parameter, retorno = @retorno_parameter, campoAplicacao = @campoAplicacao_parameter, fundamentosInvencao = @fundamentosInvencao_parameter, estadoTecnica = @estadoTecnica_parameter, problemas = @problemas_parameter, solucaoInvencao = @solucaoInvencao_parameter, vantagens = @vantagens_parameter, descricaoDesenhos = @descricaoDesenhos_parameter, descricaoInvencao = @descricaoInvencao_parameter where id = @id_parameter');

        return updatedFormulario;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function deleteFormulario(id) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let formulario = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from formulario where id = @id_parameter');

        return formulario;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getFormularioBySolicitacao(id) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let formulario = await pool.request()
            .input('solicitacao_parameter', sql.Int, id)
            .query('select * from formulario where solicitacao = @solicitacao_parameter');

        await getNodeResponsavel(formulario.recordset);

        return formulario.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}