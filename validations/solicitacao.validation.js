let usuarioSpecification = require('../specifications/usuario.specification');
let solicitacaoSpecification = require('../specifications/solicitacao.specification');

let validations = {};
validations.existeUsuariosTipoSolicitacao = existeUsuariosTipoSolicitacao;

module.exports = validations;

async function existeUsuariosTipoSolicitacao(colaboradorId, clienteId, tipoSolicitacao, statusSolicitacaoId) {
    let colaboradorCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(colaboradorId);
    let clienteCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(clienteId);
    let tipoSolicitacaoCadastrado = await solicitacaoSpecification.existeTipoSolicitacaoCadastradaPorId(tipoSolicitacao);
    let statusSolicitacaoCadastrado = await solicitacaoSpecification.existeTipoSolicitacaoCadastradaPorId(statusSolicitacaoId);

    return colaboradorCadastrado && clienteCadastrado && tipoSolicitacaoCadastrado && statusSolicitacaoCadastrado;
}