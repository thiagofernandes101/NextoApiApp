const { response } = require('express');
var express = require('express');
var router = express.Router();

var usuarioService = require('../services/usuario.service');
var usuarioValidation = require('../validations/usuario.validation');

router.post('/registrar', registerUsuario);
router.get('/', listUsuarios);
router.get('/:id', listUsuarioById);
router.put('/', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/autenticar', autenticaChaveUsuario);
router.post('/alteraSenha', alterarSenha);

module.exports = router;

async function listUsuarios(request, response) {
    try {
        let usuarios = await usuarioService.getUsuario();

        if (usuarios.length > 0) {
            response.status(200).send(usuarios);
        }
        else {
            response.status(400).send({ Error: 'Erro ao obter todos os usuários' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function listUsuarioById(request, response) {
    try {
        let usuario = await usuarioService.getUsuarioById(request.params.id);

        if (usuario.length > 0) {
            response.status(200).send(usuario);
        }
        else {
            response.status(400).send({ Error: 'Error ao obter um usuario' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function registerUsuario(request, response) {
    try {
        let usuarioJaCadastrado = await usuarioValidation.usuarioJaExistente(request.body);

        if (!usuarioJaCadastrado) {
            let usuarioAdicionado = await usuarioService.addUsuario(request.body);

            if (usuarioAdicionado.rowsAffected[0] != 0) {
                response.status(200).send({ Message: 'Usuário cadastrado com sucesso' });
            }
            else {
                response.status(400).send({ Error: 'Erro ao adicionar um usuário' });
            }
        }
        else {
            response.status(400).send({ Error: 'Usuario já cadastrado' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function updateUsuario(request, response) {
    try {
        let usuarioJaCadastrado = await usuarioValidation.usuarioJaExistente(request.body);

        if (usuarioJaCadastrado) {
            let usuario = await usuarioService.updateUsuario(request.body);

            if (usuario.rowsAffected[0] != 0) {
                response.status(200).send({ Message: 'Usuário atualizado com sucesso' });;
            }
            else {
                response.status(400).send({ Error: 'Erro ao atualizar um usuário' });
            }
        }
        else {
            response.status(400).send({ Error: 'Usuario não cadastrado' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function deleteUsuario(request, response) {
    try {
        let usuarioDeletado = await usuarioService.deleteUsuario(request.params.id);

        if (usuarioDeletado.rowsAffected[0] != 0) {
            response.status(200).send({ Message: 'Usuário excluido com sucesso' });
        }
        else {
            response.status(200).send({ Message: 'Nenhum usuário encontrado para exclusão' });
        }

    }
    catch (error) {
        console.log(error);
        response.status(400).send(error.toString());
    }
}

async function autenticaChaveUsuario(request, response) {
    try {
        let result = await usuarioService.autenticaUsuario(request.body.Usuario, request.body.Senha);
        if (result) {
            response.status(200).send(result);
        }
        else {
            response.status(400).send('Falha na autenticação');
        }
    }
    catch (error) {
        console.log(error);
        response.status(400).send(error.toString());
    }
}

async function alterarSenha(request, response) {
    try {
        let usuarioJaCadastrado = await usuarioValidation.usuarioJaExistente(request.body);

        if (usuarioJaCadastrado) {
            let result = await usuarioService.alterarSenha(request.body.Usuario, request.body.Senha);

            if (result.rowsAffected) {
                response.status(200).send({ Message: 'Senha alterada com sucesso' });
            }
            else {
                response.status(400).send({ Error: 'Erro ao alterar a senha' });
            }
        }
        else {
            response.send(400).send({ Error: 'Usuário não encontrado. Não será possível alterar a senha' });
        }
    }
    catch (error) {
        console.log(error);
        response.status(400).send(error.toString());
    }
}