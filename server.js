const express = require('express')
const app = express();
require('rootpath')();
//let config = require("./config.json");
let cors = require('cors');
let expressJwt = require('express-jwt');

let api = express();
api.use(cors());
api.use(express.urlencoded());
api.use(express.json());

//api.use('/api', expressJwt({ secret: process.env.secret || config.secret }).unless({ path: ['/api/usuario/autenticar'] }));
api.use('/api/perfil', require('./controllers/perfil.controller'));

var apiPort = process.env.PORT || 3000;

var serverAPI = api.listen(apiPort, function () {
    console.log('Server API listening at http://' + serverAPI.address().address + ':' + serverAPI.address().port);
});
