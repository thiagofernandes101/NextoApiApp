let usuarioService = require('../services/usuario.service');

var usuarioSpecifications = {};
usuarioSpecifications.existeUsuarioCadastradoPorId = existeUsuarioCadastradoPorId;

module.exports = usuarioSpecifications;

async function existeUsuarioCadastradoPorId(id) {
    let usuarioCadastrado = await usuarioService.getUsuarioById(id);
    return usuarioCadastrado[0].length > 0;
}