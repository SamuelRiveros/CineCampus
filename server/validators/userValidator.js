const { body } = require("express-validator")

exports.userValidationRules = () => {
    return [
        body('nombre').notEmpty().withMessage('El nombre es requerido'),
        body('email').isEmail().withMessage('El email no es valido'),
        body('contrasena').isLength({ min: 8 }).withMessage('La contraseña es muy corta tiene que ser mas de 8 caracteres')
    ];
};