let usuarioSpecification = require('../specifications/usuario.specification');
let solicitacaoSpecification = require('../specifications/solicitacao.specification');

let validations = {};
validations.validaExistenciaUsuariosTipoSolicitacao = validaExistenciaUsuariosTipoSolicitacao;

module.exports = validations;

async function validaExistenciaUsuariosTipoSolicitacao(solicitacao) {
    let colaboradorCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(solicitacao.Colaborador);
    let clienteCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(solicitacao.Cliente);
    let tipoSolicitacaoCadastrado = await solicitacaoSpecification.existeTipoSolicitacaoCadastradaPorId(solicitacao.TipoSolicitacao);

    return colaboradorCadastrado && clienteCadastrado && tipoSolicitacaoCadastrado;
}