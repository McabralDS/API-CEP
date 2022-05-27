require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');
const Auth = require('./middleware/auth.js'); 
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Autenticação
app.use(
    Auth.unless('/health_check', 
        basicAuth({
            authorizer: Auth.regra,
            unauthorizedResponse: {erro: "Autenticação Invalida"}
        })
    )
);

// Headers
app.use((req, res, next) => {
    
    // Headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-credentials, access-control-allow-headers, access-control-allow-methods, content-type, authorization");
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
});


// APP ROUTES
const health_check = require('./routes/health_check.router.js');
const consulta_cep = require('./routes/consulta_cep.router.js');

// Rotas
app.use('/health_check', health_check);
app.use('/consulta', consulta_cep);

// Tratamento de erros
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({msg: "Ocorrn um erro inesperado"});
    }
    
    next();
})

// Start server
app.listen(port, () => console.log(`API rodando na porta: ${port}!`));
