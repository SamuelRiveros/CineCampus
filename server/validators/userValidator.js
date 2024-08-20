const { body, query, param } = require("express-validator");

exports.usuarioValidationRulesCreation = () => {
    return [
        body('nombre').notEmpty().isString().withMessage('El nombre es obligatorio'),
        body('apellido').notEmpty().isString().withMessage('El apellido es obligatorio'),
        body('nick').notEmpty().isString().withMessage('El nick es obligatorio'),
        body('pwd').notEmpty().isString().withMessage('La contraseña es obligatoria'),
        body('email').notEmpty().isEmail().withMessage('El email es obligatorio'),
        body('telefono').notEmpty().isString().withMessage('El telefono es obligatorio'),
        body('tipo', 'El tipo no se envio').notEmpty().exists().custom((value) => {
            if(value && !['Estandar', 'VIP', 'Admin'].includes(value)) {
                throw new Error("Solo hay tres roles disponibles 'Estandar', 'VIP' y 'Admin'");
            }
            return true;
        }),
        body('numero_tarjeta').optional().isLength({min: 16, max:16}).withMessage('El numero tiene que ser de 16 digitos').matches(/^\d+$/).withMessage('La tarjeta debe contener solo números')
    ]
};