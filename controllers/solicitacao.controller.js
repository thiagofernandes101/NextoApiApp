let express = require('express');
let router = express.Router();
let solicitacaoService = require('../services/solicitacao.service');
let solicitacaoValidation = require('../validations/solicitacao.validation');

router.post('/', registerSolicitacao);
router.get('/', listSolicitacoes);
router.get('/:id', listSolicitacaoById);
router.put('/', updateExistingSolicitacao);
router.delete('/:id', deleteSolicitacao);

module.exports = router;

async function listSolicitacoes(request, response) {
    try {
        let solicitacoes = await solicitacaoService.getSolicitacao();

        if (solicitacoes.length > 0) {
            response.status(200).send(solicitacoes);
        }
        else {
            response.status(400).send({ Error: 'Nenhuma solicitação encontrada' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function listSolicitacaoById(request, response) {
    try {
        let solicitacao = await solicitacaoService.getSolicitacaoById(request.body.Id);

        if (solicitacao.length > 0) {
            response.status(200).send(solicitacao);
        }
        else {
            response.status(400).send({ Error: 'Nenhuma solicitação encontrada' });
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function registerSolicitacao(request, response) {
    try {
        let solicitacaoValida = await solicitacaoValidation.existeUsuariosTipoSolicitacao(request.body.Colaborador, request.body.Cliente, request.body.Tipo, request.body.Status);

        if (solicitacaoValida) {
            let solicitacaoCadastrada = await solicitacaoService.addSolicitacao(request.body);

            if (solicitacaoCadastrada.rowsAffected[0] > 0) {
                response.status(200).send({Message: 'Solicitação cadastrada com sucesso'});
            }
            else {
                response.status(400).send({Error: 'Não foi possível cadastrar a solicitação'});
            }
        }
        else {
            response.status(400).send({Error: 'Solicitação inválida. Por favor verifique se os campos colaborador, cliente, tipo de solicitação e status foram preenchidos'});
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function updateExistingSolicitacao(request, response) {
    try {
        let solicitacaoValida = await solicitacaoValidation.existeUsuariosTipoSolicitacao(request.body.Colaborador, request.body.Cliente, request.body.Tipo, request.body.Status);

        if (solicitacaoValida) {
            let solicitacaoCadastrada = await solicitacaoService.updateSolicitacao(request.body);

            if (solicitacaoCadastrada.rowsAffected[0] > 0) {
                response.status(200).send({Message: 'Solicitação atualizada com sucesso'});
            }
            else {
                response.status(400).send({Error: 'Não foi possível atualizar a solicitação'});
            }
        }
        else {
            response.status(400).send({Error: 'Solicitação inválida. Por favor verifique se os campos colaborador, cliente, tipo de solicitação e status foram preenchidos'});
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function deleteSolicitacao(request, response) {
    try {
        let solicitacaoExcluida = await solicitacaoService.deleteSolicitacao(request.params.id);

        if (solicitacaoExcluida.rowsAffected[0] > 0) {
            response.status(200).send({ Message: 'Solicitação excluida com sucesso' });
        }
        else {
            response.status(200).send({ Message: 'Nenhuma solicitação encontrada para exclusão' });
        }
    }
    catch (error) {
        response.status(400).send(error.ToString());
    }
}