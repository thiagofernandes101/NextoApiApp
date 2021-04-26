let usuarioSpecification = require('../specification/usuario.specification');
let solicitacaoSpecification = require('../specification/solicitacao.specification');

let validations = {};
validations.validaExistenciaUsuariosTipoSolicitacao = validaExistenciaUsuariosTipoSolicitacao;

module.exports = validations;

async function validaExistenciaUsuariosTipoSolicitacao(solicitacao) {
    let colaboradorCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(solicitacao.Colaborador);
    let clienteCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(solicitacao.Cliente);
    let tipoSolicitacaoCadastrado = await solicitacaoSpecification.existeTipoSolicitacaoCadastradaPorId(solicitacao.TipoSolicitacao);

    return colaboradorCadastrado && clienteCadastrado && tipoSolicitacaoCadastrado;
}