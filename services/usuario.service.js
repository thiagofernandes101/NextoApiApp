const sql = require('mssql');
let q = require('q');
let config = require("../config.json");
let jwt = require('jsonwebtoken');
let lodash = require('lodash');
let bcrypt = require('bcryptjs');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addUsuario = addUsuario;
service.getUsuario = getUsuario;
service.getUsuarioById = getUsuarioById;
service.deleteUsuario = deleteUsuario;
service.updateUsuario = updateUsuario;
service.autenticaUsuario = autenticaUsuario;

module.exports = service;

async function getUsuario() {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let usuario = await pool.request()
            .query('select * from Usuario');
        
        return usuario.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function getUsuarioById(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let usuario = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from Usuario where id = @id_parameter');
        
        return usuario.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function addUsuario(usuarioParameter) {
    let deferred = q.defer();

    try {
        let usuario = lodash.omit(usuarioParameter, 'password')
        let pool = await sql.connect(databaseConfiguration);
        let senhaUsuarioEncriptada = bcrypt.hashSync(usuario.Senha, 10);
        let addedUsuario = await pool.request()
            .input('usuario_parameter', sql.VarChar, usuario.Usuario)
            .input('senha_parameter', sql.VarChar, senhaUsuarioEncriptada)
            .input('nome_parameter', sql.VarChar, usuario.Nome)
            .input('telefone_parameter', sql.VarChar, usuario.Telefone)
            .input('email_parameter', sql.VarChar, usuario.Email)
            .input('cpf_parameter', sql.VarChar, usuario.Cpf)
            .input('sexo_parameter', sql.VarChar, usuario.Sexo)
            .input('estado_parameter', sql.VarChar, usuario.Estado)
            .input('cidade_parameter', sql.VarChar, usuario.Cidade)
            .input('perfil_parameter', sql.Int, usuario.Perfil)
            .query('insert into Usuario (usuario, senha, nome, telefone, email, cpf, sexo, estado, cidade, perfil) values (@usuario_parameter, @senha_parameter, @nome_parameter, @telefone_parameter, @email_parameter, @cpf_parameter, @sexo_parameter, @estado_parameter, @cidade_parameter, @perfil_parameter)');

        return addedUsuario;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function updateUsuario(usuario) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let updatedUsuario = await pool.request()
            .input('id_parameter', sql.Int, usuario.id)
            .input('usuario_parameter', sql.VarChar, usuario.Usuario)
            .input('senha_parameter', sql.VarChar, usuario.Senha)
            .input('nome_parameter', sql.VarChar, usuario.Nome)
            .input('telefone_parameter', sql.VarChar, usuario.Telefone)
            .input('email_parameter', sql.VarChar, usuario.Email)
            .input('cpf_parameter', sql.VarChar, usuario.Cpf)
            .input('sexo_parameter', sql.VarChar, usuario.Sexo)
            .input('estado_parameter', sql.VarChar, usuario.Estado)
            .input('cidade_parameter', sql.VarChar, usuario.Cidade)
            .input('perfil_parameter', sql.Int, usuario.Perfil)
            .query('update Usuario set usuario = @usuario_parameter, senha = @senha_parameter, nome = @nome_parameter, telefone = @telefone_parameter, email = @email_parameter, cpf = @cpf_parameter, sexo = @sexo_parameter, estado = @estado_parameter, cidade = @cidade_parameter, perfil = @perfil_parameter where id = @id_parameter');

        return updatedUsuario;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function deleteUsuario(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let usuario = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('delete from Usuario where id = @id_parameter');
        
        return usuario;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function autenticaUsuario(usuario, senha) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);

        let usuarioAutenticado = await pool.request()
            .input('usuario_parameter', sql.VarChar, usuario)
            .query('select * from usuario where usuario = @usuario_parameter');
        
        usuarioAutenticado = usuarioAutenticado.recordset;
        
        if (usuarioAutenticado && bcrypt.compareSync(senha, usuarioAutenticado[0].Senha)) {
            deferred.resolve({token :jwt.sign({sub: usuarioAutenticado[0].Id}, config.secret), usuarioId: usuarioAutenticado.Id});
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}