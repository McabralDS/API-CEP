const express = require('express');
const route = express.Router();
const ConsultaCep = require('./../controller/consulta_cep.controller.js');
const Validacao = require('./../middleware/validacao.js');

// Rota para buscar endereço por cep
route.post('/cep', Validacao.cep, (req, res) => {    
    ConsultaCep.buscaPorCep(req, res);
});

// Rota para buscar endereço por Estado, cidade e rua
route.post('/endereco', Validacao.endereco, (req, res) => {
    ConsultaCep.buscaPorEndereco(req, res);
});


module.exports = route