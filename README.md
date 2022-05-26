# API-CEP

![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
)
![image](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)


 API para consulta de CEP utilizando <a href="https://www.viacep.com.br">Via Cep</a>.


 ```
    Autor: Mateus Cabral dos Santos
    Versão: 1.0.0
    Update: 26/05/2022
    Node: v17.5.0
 ```

 ---

 ## Incialização

 ```
    npm run start
 ```

 ```
    npm run start:dev
 ```

 ---

 ## Endpoints

 ### Health Check

 Consulta status da API

 ```
    Enpoint: localhost:3000/health_check
    Método: GET
    Autenticão: Não
    Request: {}
    Response:
        {
            "api":"API_CEP",
            "version":"1.0.0",
            "status":"OK"
        }
 ```

 ### Consulta por CEP
 Consulta endereço a partir do CEP informado. Caso o CEP tenha sido consultado nos últimos 5 minutos a busca é feita em cache. O tempo é configurado através do arquivo .env 
  
```
    Enpoint: localhost:3000/consulta/cep
    Método: POST
    Autenticão: Basic Auth
    Request:
        {
            "cep":"89080003"
        }
    Response:
        {
            "status": "OK",
            "cep": "89080003",
            "origem": "viacep",
            "endereco": {
                "cep": "89080-003",
                "logradouro": "Rua Doutor Blumenau",
                "complemento": "até 249/250",
                "bairro": "Centro",
                "localidade": "Indaial",
                "uf": "SC",
                "ibge": "4207502",
                "gia": "",
                "ddd": "47",
                "siafi": "8147"
            }
        }
    Validações:
        - CEP obrigatoriamente com 8 caractéres, apenas números 
 ```

 ### Consulta por Endereço
 Consulta endereço a partir do CEP informado
  
```
    Enpoint: localhost:3000/consulta/cep
    Método: POST
    Autenticão: Basic Auth
    Request:
        {
            "estado": "SC",
            "cidade": "indaial",
            "rua": "Rua Doutor Blumenau"
        }
    Response:
        {
            "status": "OK",
            "origem": "viacep",
            "enderecos": [
                {
                "cep": "89080-003",
                "logradouro": "Rua Doutor Blumenau",
                "complemento": "até 249/250",
                "bairro": "Centro",
                "localidade": "Indaial",
                "uf": "SC",
                "ibge": "4207502",
                "gia": "",
                "ddd": "47",
                "siafi": "8147"
                }
            ]
        }
    Validações:
        - Estado: obrigatoriamente com 2 caractéres, apenas letras
        - Cidade: minimo de 3 caractéres, apenas letras
        - Rua: minimo de 3 caractéres, apenas letras
 ```


