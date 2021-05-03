let usuarioSpecification = require('../specifications/usuario.specification');

let validations = {};
validations.usuarioJaExistente = usuarioJaExistente;

module.exports = validations;

async function usuarioJaExistente(usuario) {
    let usuarioCadastrado = await usuarioSpecification.nomeUsuarioJaCadastrado(usuario.Usuario);
    return usuarioCadastrado;
}