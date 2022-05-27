const Validacao = require('../middleware/validacao.js');
const Request = require('../helper/viacep.js');
const Cache = require('../helper/cache.js');
const _ = require('lodash');


const ConsultaCep = {

    // Busca endereço por cep
    buscaPorCep: async (req, res) => {

        let stat, response, endereco;
        let errors = Validacao.erros(req);
        let param = req.body;

        // Valida se o request é valido
        if (!_.isEmpty(errors)) {
            stat = 400;
            response = { erro: errors };
        } else {

            // Verifica CEP no cache
            let cepCache = Cache.get(param.cep);

            // Se não existir no cache, busca na viacep
            endereco = !cepCache ? await Request.consultaCep(param.cep) : cepCache;
           

            // Se ocorrer erro durante a busca
            if (endereco.erro) {
                stat = 400;
                response = {
                    status: 'erro',
                    msg: "Endereço não encontrado",
                    origem: (cepCache) ? 'cache' : 'viacep',
                }
            } else {

                // Salva cep no cache
                Cache.set(param.cep, endereco);

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

    // Busca endereço por Estado, cidade e rua
    buscaPorEndereco: async (req, res) => {
        let stat, response;
        let errors = Validacao.erros(req);
        let param = req.body;

        // Valida se o request é valido
        if (!_.isEmpty(errors)) {
            stat = 400;
            response = { erro: errors };
        } else {

            // Busca CEP na viacep
            let endereco = await Request.consultaEndereco(param.estado, param.cidade, param.rua);

            // Se ocorrer erro durante a busca
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
    }
}


module.exports = ConsultaCep;