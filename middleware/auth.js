const basicAuth = require('express-basic-auth')

const Auth = {
   
    // Regra de usuario e senha
    regra: (username, password) => {

        const userMatches = basicAuth.safeCompare(username, process.env.USER);
        const passwordMatches = basicAuth.safeCompare(password, process.env.PASSWORD);
    
        return userMatches & passwordMatches
    },

    // função para remover rota especifica da autenticação 
    unless:(path, middleware) => {
        return (req, res, next) => {
            if (path === req.url) {
                return next();
            } else {
                return middleware(req, res, next);
            }
        }
    }

}

module.exports = Auth;