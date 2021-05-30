let config = require('../config.json');
let sql = require('mssql');
let q = require('q');
let usuarioService = require('./usuario.service');
let formularioService = require(`./formulario.service`);

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addSolicitacao = addSolicitacao;
service.getSolicitacao = getSolicitacao;
service.getSolicitacaoById = getSolicitacaoById;
service.deleteSolicitacao = deleteSolicitacao;
service.updateSolicitacao = updateSolicitacao;

module.exports = service;

async function getSolicitacao() {
    try {
        let pool = await sql.connect(databaseConfiguration);

        let solicitacao = await pool.request()
            .query('select solicitacao.*, null as Formularios from solicitacao');

        let formulario = await formularioService.getFormulario();

        solicitacao = solicitacao.recordset;

        await getNodeFormulario(solicitacao, formulario);

        return solicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getSolicitacaoById(id) {
    try {
        let pool = await sql.connect(databaseConfiguration);

        let solicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select solicitacao.*, null as Formularios from solicitacao where id = @id_parameter');

        let formulario = await formularioService.getFormularioBySolicitacao(id);

        await getNodeFormulario(solicitacao.recordset, formulario);

        return solicitacao.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function addSolicitacao(solicitacao) {
    try {
        let clienteId = solicitacao.Cliente == null ? 0 : solicitacao.Cliente.Id;
        let colaboradorId = solicitacao.Colaborador == null ? null : solicitacao.Colaborador.Id;
        let status = solicitacao.Status == null ? 1 : solicitacao.Status;

        let pool = await sql.connect(databaseConfiguration);
        let addedSolicitacao = await pool.request()
            .input('nome_parameter', sql.VarChar, solicitacao.Nome)
            .input('sigla_parameter', sql.VarChar, solicitacao.Sigla)
            .input('tipo_parameter', sql.Int, solicitacao.Tipo)
            .input('dataInicio_parameter', sql.DateTime, solicitacao.DataInicio)
            .input('dataFim_parameter', sql.DateTime, solicitacao.DataFim)
            .input('cliente_parameter', sql.Int, clienteId)
            .input('colaborador_parameter', sql.Int, colaboradorId)
            .input('status_parameter', sql.Int, status)
            .query('insert into solicitacao (nome, sigla, tipo, dataInicio, dataFim, cliente, colaborador, status) values (@nome_parameter, @sigla_parameter, @tipo_parameter, @dataInicio_parameter, @dataFim_parameter, @cliente_parameter, @colaborador_parameter, @status_parameter)');

        return addedSolicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateSolicitacao(solicitacao) {
    try {
        let clienteId = solicitacao.Cliente == null ? 0 : solicitacao.Cliente.Id;
        let colaboradorId = solicitacao.Colaborador == null ? null : solicitacao.Colaborador.Id;
        let status = solicitacao.Status == null ? 1 : solicitacao.Status;

        let pool = await sql.connect(databaseConfiguration);
        let updatedSolicitacao = await pool.request()
            .input('id_parameter', sql.Int, solicitacao.Id)
            .input('nome_parameter', sql.VarChar, solicitacao.Nome)
            .input('sigla_parameter', sql.VarChar, solicitacao.Sigla)
            .input('tipo_parameter', sql.Int, solicitacao.Tipo)
            .input('dataInicio_parameter', sql.DateTime, solicitacao.DataInicio)
            .input('dataFim_parameter', sql.DateTime, solicitacao.DataFim)
            .input('cliente_parameter', sql.Int, clienteId)
            .input('colaborador_parameter', sql.Int, colaboradorId)
            .input('status_parameter', sql.Int, status)
            .query('update solicitacao set nome = @nome_parameter, sigla = @sigla_parameter, tipo = @tipo_parameter, dataInicio = @dataInicio_parameter, dataFim = @dataFim_parameter, cliente = @cliente_parameter, colaborador = @colaborador_parameter, status = @status_parameter where id = @id_parameter');

        return updatedSolicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function deleteSolicitacao(id) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let solicitacao = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from solicitacao where id = @id_parameter');

        return solicitacao;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getNodeFormulario(solicitacao, formulario) {
    for (let solicitacaoIndex = 0; solicitacaoIndex < solicitacao.length; solicitacaoIndex++) {
        let formularios = [];

        for (let formularioIndex = 0; formularioIndex < formulario.length; formularioIndex++) {
            if (solicitacao[solicitacaoIndex].Id == formulario[formularioIndex].Solicitacao) {
                formularios.push(formulario[formularioIndex]);
            }
        }

        await getNodeUsuario(solicitacao, solicitacaoIndex);

        solicitacao[solicitacaoIndex].Formularios = formularios;
    }
}

async function getNodeUsuario(solicitacao, solicitacaoIndex) {
    if (solicitacao[solicitacaoIndex].Cliente != null) {
        let cliente = await usuarioService
            .getUsuarioById(solicitacao[solicitacaoIndex].Cliente);

        solicitacao[solicitacaoIndex].Cliente = cliente[0];
    } else {
        solicitacao[solicitacaoIndex].Cliente = null;
    }

    if (solicitacao[solicitacaoIndex].Colaborador != null) {
        let colaborador = await usuarioService
            .getUsuarioById(solicitacao[solicitacaoIndex].Colaborador);

        solicitacao[solicitacaoIndex].Colaborador = colaborador[0];
    } else {
        solicitacao[solicitacaoIndex].Colaborador = null;
    }
}