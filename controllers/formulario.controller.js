var express = require('express');
var router = express.Router();

var formularioService = require('../services/formulario.service');
var formularioValidation = require('../validations/formulario.validation');

router.post('/', registerFormulario);
router.get('/', listFormularios);
router.get('/:id', listFormularioById);
router.put('/', updateFormulario);
router.delete('/:id', deleteFormulario);

module.exports = router;

async function listFormularios(request, response) {
    try {
        let formularios = await formularioService.getFormulario();

        if (formularios.length > 0) {
            response.status(200).send(formularios);
        }
        else {
            response.status(400).send({ Error: 'Nenhum formulário encontrado' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function listFormularioById(request, response) {
    try {
        let formulario = await formularioService.getFormularioById(request.params.id);

        if (formulario.length > 0) {
            response.status(200).send(formulario);
        }
        else {
            response.status(400).send({ Error: 'Nenhum formulário encontrado' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function registerFormulario(request, response) {
    try {
        let formularioValido = await formularioValidation.existeResponsavelSolicitacao(request.body.Responsavel, request.body.Solicitacao);

        if (formularioValido) {
            let formularioCadastrado = await formularioService.addFormulario(request.body);

            if (formularioCadastrado.rowsAffected[0] != 0) {
                response.status(200).send({ Message: 'Formulário cadastrado com sucesso' });
            }
            else {
                response.status(400).send({ Error: 'Não foi possível cadastrar o formulário' });
            }
        }
        else {
            response.status(200).send({Message: 'Formulario já cadastrado'});
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function updateFormulario(request, response) {
    try {
        let formularioValido = await formularioValidation.existeResponsavelSolicitacao(request.body.Responsavel, request.body.Solicitacao);

        if (formularioValido) {
            let formularioCadastrado = await formularioService.updateFormulario(request.body);

            if (formularioCadastrado.rowsAffected[0] != 0) {
                response.status(200).send({ Message: 'Formulário cadastrado com sucesso' });
            }
            else {
                response.status(400).send({ Error: 'Não foi possível atualizar o formulário' });
            }
        }
        else {
            response.status(200).send({Message: 'Formulario inválido. Por favor verifique se o responsável e a solicitação são válidos'});
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function deleteFormulario(request, response) {
    try {
        let formularioExcluido = await formularioService.deleteFormulario(request.params.id);

        if (formularioExcluido.rowsAffected[0] != 0) {
            response.status(200).send(formularioExcluido[0]);
        }
        else {
            response.status(200).send({ Message: 'Nenhum formulario encontrado para exclusao' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}