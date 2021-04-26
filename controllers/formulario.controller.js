var express = require('express');
var router = express.Router();

var formularioService = require('../services/formulario.service');
var validacaoFormulario = require('../validations/formulario.validation');

router.post('/', registerFormulario);
router.get('/', listPerfis);
router.get('/:id', listFormularioById);
router.put('/', updateExistingFormulario);
router.delete('/:id', deleteFormulario);

module.exports = router;

function listPerfis(request, response) {
    formularioService.getFormulario().then(result => {
        response.json(result[0]);
    }).catch(error => {
        console.log(error);
        response.status(400).send({
            errorMessage: 'Nenhum formulário encontrado'
        });
    });
}

function listFormularioById(request, response) {
    try {
        let id = request.params.id;

        formularioService.getFormularioById(id).then(result => {
            response.json(result[0]);
        }).catch(error => {
            response.status(400).send({
                errorMessage: 'Nenhum formulário encontrado'
            });
        });
    }
    catch (error) {
        
    }
}

async function registerFormulario(request, response) {
    try {
        let formulario = request.body;
        let formularioValidoParaCadastro = await validacaoFormulario.validaExistenciaResponsavelSolicitacao(formulario);

        if (!formularioValidoParaCadastro) {
            response.status(400).send({errorMessage: 'Informacoes obrigatorias nao encontradas ou informadas'})
        }

        formularioService.addFormulario(formulario).then(result => {
            response.status(201).send(result);
        }).catch(error => {
            response.status(400).send(error);
        });
    }
    catch (error) {
        errorMessage(error, response, 'Erro ao cadastrar um formulário');
    }
}

async function updateExistingFormulario(request, response) {
    try {
        let formulario = request.body;

        if (await validacaoFormulario.validaExitenciaResponsavelSolicitacao(formulario)) {
            formularioService.updateFormulario(formulario).then(result => {
                response.status(201).send(result);
            }).catch(error => {
                response.status(400).send({ errorMessage: 'Falha ao atualizar um Formulario' });
            });
        }
    }
    catch (error) {
        errorMessage(error, response, 'Erro ao atualizar um formulário');
    }
}

function deleteFormulario(request, response) {
    try {
        let id = request.params.id;

        formularioService.deleteFormulario(id)
            .then(result => {
                response.status(201).send(result);
            })
            .catch(error => {
                console.log(error);
                response.status(400).send({
                    errorMessage: 'Falha ao excluir um formulario'
                });
            });
    }
    catch (error) {
        errorMessage(error, response, 'Erro ao excluir um formulário');
    }
}

function errorMessage(errorFromCatch, response, mensagemErro) {
    console.log(errorFromCatch);
    response.status(400).send({
        errorMessage: mensagemErro
    });
}