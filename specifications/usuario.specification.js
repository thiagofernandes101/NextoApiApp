let usuarioService = require('../services/usuario.service');

var usuarioSpecifications = {};
usuarioSpecifications.existeUsuarioCadastradoPorId = existeUsuarioCadastradoPorId;
usuarioSpecifications.nomeUsuarioJaCadastrado = nomeUsuarioJaCadastrado;

module.exports = usuarioSpecifications;

async function existeUsuarioCadastradoPorId(id) {
    let usuarioCadastrado = await usuarioService.getUsuarioById(id);
    return usuarioCadastrado.length > 0;
}

async function nomeUsuarioJaCadastrado(usuario) {
    let usuarioCadastrado = await usuarioService.getByUsuario(usuario);
    return usuarioCadastrado.length != 0;
}