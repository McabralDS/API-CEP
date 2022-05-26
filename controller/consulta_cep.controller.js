const Validacao = require('../middleware/validacao.js');
const Request = require('../helper/viacep.js');
const Cache = require('../helper/cache.js');
const _ = require('lodash');


const ConsultaCep = {

    buscaPorCep: async (req, res) => {

        let stat, response, endereco;
        let errors = Validacao.erros(req);
        let param = req.body;

      
        if (!_.isEmpty(errors)) {
            stat = 400;
            response = { erro: errors };
        } else {

            let cepCache = ConsultaCep.cepCache(param.cep);

            if (!cepCache) {
                endereco = await Request.consultaCep(param.cep);

                Cache.set(param.cep, endereco);
            } else {
                endereco = cepCache;
            }

            if (endereco.erro) {
                stat = 400;
                response = {
                    status: 'erro',
                    msg: "Endereço não encontrado",
                    origem: (cepCache) ? 'cache' : 'viacep',
                }
            } else {
                stat = 200;
                response = {
                    status: 'OK',
                    cep: param.cep,
                    origem: (cepCache) ? 'cache' : 'viacep',
                    endereco: endereco
                }
            }
            
        }

        res.status(stat).json(response);

    },

    buscaPorEndereco: async (req, res) => {
        let stat, response;
        let errors = Validacao.erros(req);
        let param = req.body;

      
        if (!_.isEmpty(errors)) {
            stat = 400;
            response = { erro: errors };
        } else {

            let endereco = await Request.consultaEndereco(param.estado, param.cidade, param.rua);

            if (endereco.erro) {
                stat = 400;
                response = {
                    status: 'erro',
                    msg: "Endereço não encontrado"
                }
            } else {
                stat = 200;
                response = {
                    status: 'OK',
                    origem: 'viacep',
                    enderecos: endereco
                }
            }
            
        }

        res.status(stat).json(response);
    },

    cepCache:  (cep) => {

       return Cache.get(cep);

    }
}


module.exports = ConsultaCep;