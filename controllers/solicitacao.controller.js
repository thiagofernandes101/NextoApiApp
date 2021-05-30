let express = require('express');
let router = express.Router();
let solicitacaoService = require('../services/solicitacao.service');
let arquivoService = require('../services/arquivo.service');
let arquivoSolicitacaoService = require('../services/arquivoSolicitacao.service');
const { response } = require('express');

router.post('/', registerSolicitacao);
router.get('/', listSolicitacoes);
router.get('/:id', listSolicitacaoById);
router.put('/', updateExistingSolicitacao);
router.delete('/:id', deleteSolicitacao);
router.post('/salvarArquivo', salvarArquivo);
router.post('/deleteArquivo/:id', deleteArquivo);

module.exports = router;

async function listSolicitacoes(request, response) {
    try {
        let solicitacoes = await solicitacaoService.getSolicitacao();

        if (solicitacoes.length > 0) {
            response.status(200).send(solicitacoes);
        }
        else {
            response.status(400).send('Nenhuma solicitação encontrada');
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function listSolicitacaoById(request, response) {
    try {
        let solicitacao = await solicitacaoService.getSolicitacaoById(request.params.id);

        if (solicitacao.length > 0) {
            response.status(200).send(solicitacao[0]);
        }
        else {
            response.status(400).send('Nenhuma solicitação encontrada');
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function registerSolicitacao(request, response) {
    try {
        let solicitacaoCadastrada = await solicitacaoService.addSolicitacao(request.body);

        if (solicitacaoCadastrada.rowsAffected[0] > 0) {
            response.status(200).send('Solicitação cadastrada com sucesso');
        }
        else {
            response.status(400).send('Não foi possível cadastrar a solicitação');
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function updateExistingSolicitacao(request, response) {
    try {
        let solicitacaoCadastrada = await solicitacaoService.updateSolicitacao(request.body);

        if (solicitacaoCadastrada.rowsAffected[0] > 0) {
            response.status(200).send('Solicitação atualizada com sucesso');
        }
        else {
            response.status(400).send('Não foi possível atualizar a solicitação');
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
            response.status(200).send('Solicitação excluida com sucesso');
        }
        else {
            response.status(200).send('Nenhuma solicitação encontrada para exclusão');
        }
    }
    catch (error) {
        response.status(400).send(error.ToString());
    }
}

async function salvarArquivo(request, response) {
    try {
        let arquivos = request.body;
        let arquivosInseridosComSucesso;

        for (let index = 0; index < arquivos.length; index++) {
            arquivosInseridosComSucesso = true;

            let arquivo = arquivos[index];
            let arquivoInserido = await arquivoService.addArquivo(arquivo);

            arquivo.Id = arquivoInserido[0].ArquivoId;

            let arquivoSolicitacaoInserido = await arquivoSolicitacaoService
                .addArquivoSolicitacao(arquivo);

            if (arquivoSolicitacaoInserido.rowsAffected[0] <= 0) {
                arquivosInseridosComSucesso = false;
            }
        }

        if (arquivosInseridosComSucesso) {
            response.status(200).send('Arquivo inserido com sucesso');
        }
        else {
            response.status(400).send('Não foi possível inserir o arquivo');
        }
    }
    catch (error) {
        response.status(400).response(error.ToString());
    }
}

async function deleteArquivo(request, response) {
    try {
        let id = request.params.id
        let x = 0;
    }
    catch (error) {
        response.status(400).send(error.ToString());
    }
}