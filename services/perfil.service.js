// let databaseConfiguration = require('../dao/configuration/dbconfig');
let databaseConfiguration = process.env.NextoLocalDatabase;
let sql = require('mssql');
let q = require('q');

let service = {};
service.getPerfil = getPerfil;
service.getPerfilById = getPerfilById;
service.addPerfil = addPerfil;
service.updatePerfil = updatePerfil;
service.deletePerfil = deletePerfil;

module.exports = service;

async function getPerfil() {
    let deferred = q.defer();
    try {
        let pool = await sql.connect(databaseConfiguration);
        let perfil = await pool.request().query("select * from perfil");
        return perfil.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function getPerfilById(perfilId) {
    let deferred = q.defer();
    try {
        let pool = await sql.connect(databaseConfiguration);
        let perfil = await pool.request()
            .input('id_parameter', sql.Int, perfilId)
            .query("select * from perfil where id = @id_parameter");
        return perfil.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function addPerfil(perfil) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let addedPerfil = await pool.request()
            .input('descricao_parameter', sql.VarChar, perfil.Descricao)
            .input('sigla_parameter', sql.VarChar, perfil.Sigla)
            .query('insert into perfil (descricao, sigla) values (@descricao_parameter, @sigla_parameter) select scope_identity() as id');

        return addedPerfil;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function updatePerfil(perfil) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedPerfil = await pool.request()
            .input('id_parameter', sql.Int, parseInt(perfil.Id))
            .input('descricao_parameter', sql.VarChar, perfil.Descricao)
            .input('sigla_parameter', sql.VarChar, perfil.Sigla)
            .query('update perfil set descricao = @descricao_parameter, sigla = @sigla_parameter where id = @id_parameter');

        return updatedPerfil;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function deletePerfil(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let deletedPerfil = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from perfil where id = @id_parameter');

        return deletedPerfil;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}