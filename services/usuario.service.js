const sql = require('mssql');
let q = require('q');
let config = require("../config.json");
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const { query } = require('express');

let databaseConfiguration = process.env.NEXTODATABASE || config.localConnection;

var service = {};
service.addUsuario = addUsuario;
service.getUsuario = getUsuario;
service.getUsuarioById = getUsuarioById;
service.deleteUsuario = deleteUsuario;
service.updateUsuario = updateUsuario;
service.autenticaUsuario = autenticaUsuario;
service.getByUsuario = getByUsuario;
service.alterarSenha = alterarSenha;

module.exports = service;

async function getUsuario() {

    try {
        let pool = await sql.connect(databaseConfiguration);
        let usuario = await pool.request()
            .query('select * from Usuario');

        return usuario.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getUsuarioById(id) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let usuario = await pool.request()
            .input('id_parameter', sql.Int, id)
            .query('select * from Usuario where id = @id_parameter');

        return usuario.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function addUsuario(usuario) {
    try {
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
        throw new Error(error);
    }
}

async function updateUsuario(usuario) {
    try {
        let pool = await sql.connect(databaseConfiguration);

        let updatedUsuario = await pool.request()
            .input('id_parameter', sql.Int, usuario.Id)
            .input('nome_parameter', sql.VarChar, usuario.Nome)
            .input('telefone_parameter', sql.VarChar, usuario.Telefone)
            .input('email_parameter', sql.VarChar, usuario.Email)
            .input('sexo_parameter', sql.VarChar, usuario.Sexo)
            .input('estado_parameter', sql.VarChar, usuario.Estado)
            .input('cidade_parameter', sql.VarChar, usuario.Cidade)
            .input('perfil_parameter', sql.Int, usuario.Perfil)
            .query('update Usuario set nome = @nome_parameter, telefone = @telefone_parameter, email = @email_parameter, sexo = @sexo_parameter, estado = @estado_parameter, cidade = @cidade_parameter, perfil = @perfil_parameter where id = @id_parameter');


        return updatedUsuario;
    }
    catch (error) {
        throw new Error(error);
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
        deferred.resolve();
        throw new Error(error);
    }
}

async function getByUsuario(usuario) {
    try {
        let pool = await sql.connect(databaseConfiguration);
        let usuarioAutenticado = await pool.request()
            .input('usuario_parameter', sql.VarChar, usuario)
            .query('select * from usuario where usuario = @usuario_parameter');

        return usuarioAutenticado.recordset;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function autenticaUsuario(usuario, senha) {
    let deferred = q.defer();
    try {
        let usuarioAutenticado = await getByUsuario(usuario);
        // console.log(usuarioAutenticado[0].Senha);
        if (usuarioAutenticado.length > 0 && bcrypt.compareSync(senha, usuarioAutenticado[0].Senha)) {
            deferred.resolve({ Token: jwt.sign({ sub: usuarioAutenticado[0].Id }, config.secret), Id: usuarioAutenticado[0].Id, Usuario: usuarioAutenticado[0].Usuario, Senha: usuarioAutenticado[0].Senha, Telefone: usuarioAutenticado[0].Telefone, Email: usuarioAutenticado[0].Email, Cpf: usuarioAutenticado[0].Cpf, Sexo: usuarioAutenticado[0].Sexo, Estado: usuarioAutenticado[0].Estado, Cidade: usuarioAutenticado[0].Cidade, Perfil: usuarioAutenticado[0].Perfil });
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }
    catch (error) {
        deferred.resolve();
        throw new Error(error);
    }
}

async function alterarSenha(usuario, senha) {
    try {
        let senhaUsuarioEncriptada = bcrypt.hashSync(senha, 10);
        let pool = await sql.connect(databaseConfiguration);
        let usuarioAlterado = await pool.request()
            .input('usuario_parameter', sql.VarChar, usuario)
            .input('senha_parameter', sql.VarChar, senhaUsuarioEncriptada)
            .query('update usuario set senha = @senha_parameter where usuario = @usuario_parameter');

        return usuarioAlterado;
    }
    catch (error) {
        throw new Error(error);
    }
}