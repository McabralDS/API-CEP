const request = require('request');

const Request = {

    consultaCep: (cep) => {

        return new Promise( (resolve, reject) => {

            request(`https://viacep.com.br/ws/${cep}/json/`, (error, response, body) => {

                if (!error) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
                
            });
        })
    
    },

    consultaEndereco: (estado, cidade, rua) => {

        return new Promise( (resolve, reject) => {

            request(`https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json`, (error, response, body) => {

                try{
                    if (!error) {
                        if (response.statusCode == 200){
                            resolve(JSON.parse(body));
                        } else {
                            reject({erro: "Endereço não encontrado"});
                        }
                    } else {
                        reject(error);
                    }
                } catch(e){
                    reject({erro: "Endereço não encontrado"});
                }
                    
            });
        });
    }

}

module.exports = Request;