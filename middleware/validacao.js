const {check, validationResult} = require('express-validator');


exports.cep = [
            check('cep')
                .trim()
                .isLength({ min: 8, max: 8 })
                .withMessage('CEP deve conter 8 caracteres.')
                .isNumeric()
                .withMessage('CEP deve conter apenas números.')   
        ]

exports.endereco = [
            check('estado')
                .trim()
                .isLength({ min: 2, max: 2 })
                .withMessage('Estado deve conter 2 caracteres.')
                .isAlpha()
                .withMessage('Estado deve conter apenas letras.'),
            check('cidade')
                .trim()
                .isLength({ min: 3})
                .withMessage('Cidade deve conter no minimo 3 caracteres.')
                .isAlpha('pt-BR', { ignore: ' ' })
                .withMessage('Cidade deve conter apenas letras.'),
            check('rua')
                .trim()
                .isLength({ min: 3})
                .withMessage('Rua deve conter no minimo 3 caracteres.')
                .isAlpha('pt-BR', { ignore: ' ' })
                .withMessage('Rua deve conter apenas letras.')
            
        ]


exports.erros = (req) => {

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return {'parametro':param, 'msg': msg};
    };

    return validationResult(req).formatWith(errorFormatter).array();

}
