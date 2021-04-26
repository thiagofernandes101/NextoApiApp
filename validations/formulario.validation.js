let usuarioSpecification = require('../specifications/usuario.specification');
let solicitacaoSpecification = require('../specifications/solicitacao.specification');

let validations = {};
validations.validaExistenciaResponsavelSolicitacao = validaExistenciaResponsavelSolicitacao;

module.exports = validations;

async function validaExistenciaResponsavelSolicitacao(formulario) {
    let responsavelCadastrado = await usuarioSpecification.existeUsuarioCadastradoPorId(formulario.Responsavel)
    let solicitacaoCadastrada = await solicitacaoSpecification.existeSolicitacaoCadastradaPorId(formulario.Solicitacao);

    return responsavelCadastrado && solicitacaoCadastrada;
}