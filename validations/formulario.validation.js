let usuarioSpecification = require('../specification/usuario.specification');
let solicitacaoSpecification = require('../specification/solicitacao.specification');

let validations = {};
validations.validaExistenciaResponsavelSolicitacao = validaExistenciaResponsavelSolicitacao;

module.exports = validations;

async function validaExistenciaResponsavelSolicitacao(formulario) {
    let responsavelCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(formulario.Responsavel)
    let solicitacaoCadastrada = await solicitacaoSpecification.existeSolicitacaoCadastradaPorId(formulario.Solicitacao);

    return responsavelCadastrado && solicitacaoCadastrada;
}