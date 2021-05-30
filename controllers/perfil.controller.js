let express = require('express');
let router = express.Router();
let perfilService = require('../services/perfil.service');

router.post('/', registerPerfil);
router.get('/', listPerfis);
router.get('/:id', listPerfilById);
router.put('/', updateExistingPerfil);
router.delete('/:id', deletePerfil);

module.exports = router;

async function listPerfis(request, response) {
    // perfilService.getPerfil().then(result => {
    //     response.json(result[0]);
    // });
    try {
        let perfilServiceResult = await perfilService.getPerfil();
        response.send(perfilServiceResult);
    }
    catch (error) {
        response.send(error);
    }
}

function listPerfilById(request, response) {
    perfilService.getPerfilById(parseInt(request.params.id)).then(result => {
        response.json(result[0]);
    })
}

async function registerPerfil(request, response) {
    try{
        // let perfilAdicionado = await perfilService.addPerfil(request.body);
        for (const perfil of request.body) {
            let perfilId = await perfilService.addPerfil(perfil);
            
        }
        response.send('Tentativa de inserção feita com sucesso');
    }
    catch (error) {
        response.status(400).send(error.toString());
    }
    // let perfil = request.body;

    // perfilService.addPerfil(perfil)
    //     .then(result => {
    //         response.status(201).send(result.recordset);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         response.status(400).send({
    //             errorMessage: 'Falha ao inserir um perfil'
    //         });
    //     });
}

function updateExistingPerfil(request, response) {
    let perfil = request.body;

    perfilService.updatePerfil(perfil)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao atualizar um perfil'
            });
        });
}

function deletePerfil(request, response) {
    let id = request.params.id;

    perfilService.deletePerfil(id)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao excluir um perfil'
            });
        });
}