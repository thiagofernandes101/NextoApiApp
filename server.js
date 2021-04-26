const express = require('express')
const app = express();
require('rootpath')();
let config = require("./config.json");
let cors = require('cors');
let expressJwt = require('express-jwt');

let api = express();
api.use(cors());
api.use(express.urlencoded());
api.use(express.json());

//api.use('/api', expressJwt({ secret: process.env.secret || config.secret }).unless({ path: ['/api/usuario/autenticar'] }));
api.use('/api/usuario', require('./controllers/usuario.controller'));
api.use('/api/perfil', require('./controllers/perfil.controller'));
api.use('/api/formulario', require('./controllers/formulario.controller'));
api.use('/api/solicitacao', require('./controllers/solicitacao.controller'));

var apiPort = process.env.PORT || config.port;

var serverAPI = api.listen(apiPort, function () {
    console.log('Server API listening at http://localhost:' + serverAPI.address().port);
});
