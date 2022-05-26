const express = require('express');
const route = express.Router();
const ConsultaCep = require('./../controller/consulta_cep.controller.js');
const Validacao = require('./../middleware/validacao.js');

route.post('/cep', Validacao.cep, (req, res) => {
    
    ConsultaCep.buscaPorCep(req, res);
});

route.post('/endereco', Validacao.endereco, (req, res) => {
    ConsultaCep.buscaPorEndereco(req, res);
});


module.exports = route