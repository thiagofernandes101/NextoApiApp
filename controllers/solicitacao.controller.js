var express = require('express');
var router = express.Router();
var solicitacaoService = require('../services/solicitacao.service');

router.post('/', registerSolicitacao);
router.get('/', listPerfis);
router.get('/:id', listSolicitacaoById);
router.put('/', updateExistingSolicitacao);
router.delete('/:id', deleteSolicitacao);

module.exports = router;

function listPerfis(request, response) {
    solicitacaoService.getSolicitacao().then(result => {
        response.json(result[0]);
    });
}

function listSolicitacaoById(request, response) {
    solicitacaoService.getSolicitacaoById(parseInt(request.params.id)).then(result => {
        response.json(result[0]);
    });
}

function registerSolicitacao(request, response) {
    let Solicitacao = request.body;

    solicitacaoService.addSolicitacao(Solicitacao)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao inserir um Solicitacao'
            });
        });
}

function updateExistingSolicitacao(request, response) {
    let Solicitacao = request.body;

    solicitacaoService.updateSolicitacao(Solicitacao)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao atualizar um Solicitacao'
            });
        });
}

function deleteSolicitacao(request, response) {
    let id = request.params.id;

    solicitacaoService.deleteSolicitacao(id)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao excluir um Solicitacao'
            });
        });
}