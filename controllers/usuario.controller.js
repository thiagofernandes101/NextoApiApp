var express = require('express');
var router = express.Router();
var usuarioService = require('../services/usuario.service');
let bcrypt = require('bcryptjs');

router.post('/registrar', registerUsuario);
router.get('/', listPerfis);
router.get('/:id', listUsuarioById);
router.put('/', updateExistingUsuario);
router.delete('/:id', deleteUsuario);
router.post('/autenticar', autenticaChaveUsuario)

module.exports = router;

function listPerfis(request, response) {
    usuarioService.getUsuario().then(result => {
        response.json(result[0]);
    });
}

function listUsuarioById(request, response) {
    usuarioService.getUsuarioById(parseInt(request.params.id)).then(result => {
        response.json(result[0]);
    })
}

function registerUsuario(request, response) {
    let Usuario = request.body;

    usuarioService.addUsuario(Usuario)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao inserir um Usuario'
            });
        });
}

function updateExistingUsuario(request, response) {
    let Usuario = request.body;

    usuarioService.updateUsuario(Usuario)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao atualizar um Usuario'
            });
        });
}

function deleteUsuario(request, response) {
    let id = request.params.id;

    usuarioService.deleteUsuario(id)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao excluir um Usuario'
            });
        });
}

function autenticaChaveUsuario(request, response) {
    try {
        usuarioService.autenticaUsuario(request.body.Usuario, request.body.Senha)
            .then(result => {
                response.send(result);
            })
            .catch(error => {
                console.log(error);
                response.status(400).send(error);
            });
    }
    catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
}