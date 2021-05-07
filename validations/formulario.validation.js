let usuarioSpecification = require('../specifications/usuario.specification');
let solicitacaoSpecification = require('../specifications/solicitacao.specification');

let validations = {};
validations.existeResponsavelSolicitacao = existeResponsavelSolicitacao;

module.exports = validations;

async function existeResponsavelSolicitacao(responsavelId, solicitacaoId) {
    let responsavelCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(responsavelId)
    let solicitacaoCadastrada = await solicitacaoSpecification.existeSolicitacaoCadastradaPorId(solicitacaoId);

    return responsavelCadastrado && solicitacaoCadastrada;
}