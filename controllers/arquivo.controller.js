var express = require('express');
var router = express.Router();
let arquivoService = require('../services/arquivo.service');
let arquivoSolicitacaoService = require('../services/arquivoSolicitacao.service');

router.post('/', registerArquivo);
// router.get('/', listArquivos);
// router.get('/:id', listArquivo);
// router.put('/', updateArquivo);
// router.delete('/:id', deleteArquivo);

module.exports = router;

async function registerArquivo(request, response) {
    try {
        let arquivosNaoInseridos = [];
        let arquivosInseridosComSucesso;

        arquivosInseridosComSucesso = await insertFiles(request, 
                arquivosInseridosComSucesso, response, arquivosNaoInseridos);

        if (arquivosInseridosComSucesso) {
            // retornar o objeto do arquivo com o id da solicitacao
            let arquivoSolicitacao = await arquivoService
                .getArquivosBySolicitacao(id);

            response.status(200).send(arquivoSolicitacao);
        }
        else {
            response.status(400).send(arquivosNaoInseridos);
        }
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
}

async function insertFiles(request, arquivosInseridosComSucesso, response, 
                           arquivosNaoInseridos) {
    for (let index = 0; index < request.body.length; index++) {
        arquivosInseridosComSucesso = true;

        // inserir cada uma das requisições de arquivo
        let arquivo = request.body[index];
        let arquivoId = await arquivoService.addArquivo(arquivo);

        if (arquivoId[0] > 0) {
            // após obter o id do arquivo, inserir o tipo de arquivo
            arquivosInseridosComSucesso = await insertArquivoSolicitacao(request, 
                    index, response, arquivosInseridosComSucesso, arquivoId, 
                    arquivo, arquivosNaoInseridos);
        }
        else {
            createArquivosWithProblemsOnInsert(arquivo, arquivosNaoInseridos);
        }
    }
    return arquivosInseridosComSucesso;
}

async function insertArquivoSolicitacao(request, index, response, 
        arquivosInseridosComSucesso, arquivoId, arquivo, arquivosNaoInseridos) {
    let arquivoSolicitacao = request.body[index];
    let arquivoSolicitacaoInserido = await arquivoSolicitacaoService
        .addArquivoSolicitacao(arquivoSolicitacao);

    if (arquivoSolicitacaoInserido.rowsAffected[0] > 0) {
        response.status(200).send({ Message: 'Arquivo inserido com sucesso' });
    }
    else {
        arquivosInseridosComSucesso = false;
        await arquivoService.deleteArquivo(arquivoId);
        createArquivosWithProblemsOnInsert(arquivo, arquivosNaoInseridos);
    }
    return arquivosInseridosComSucesso;
}

function createArquivosWithProblemsOnInsert(arquivo, arquivosNaoInseridos) {
    let arquivoNaoInserido = {};

    arquivoNaoInserido["Arquivo"] = arquivo.Arquivo;
    arquivoNaoInserido["Extensao"] = arquivo.Extensao;
    arquivoNaoInserido["Nome"] = arquivo.Nome;
    arquivoNaoInserido["Solicitacao"] = arquivo.Solicitacao;
    arquivoNaoInserido["Tipo"] = arquivo.Tipo;
    arquivosNaoInseridos.push(arquivoNaoInserido);
}
