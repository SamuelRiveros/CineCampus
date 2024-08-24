const { body } = require('express-validator');

exports.userCreationValidation = () => {
    return [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser una cadena'),

        body('telefono')
            .notEmpty().withMessage('El teléfono es obligatorio')
            .isString().withMessage('El teléfono debe ser una cadena'),

        body('email')
            .notEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('El email debe ser válido'),

        body('admin')
            .optional()
            .isBoolean().withMessage('El admin debe ser un valor booleano'),

        body('targeta_vip')
            .optional()
            .isBoolean().withMessage('La targeta_vip debe ser un valor booleano'),

        body('img')
            .optional()
            .isURL().withMessage('La URL de la imagen debe ser válida')
    ];
};

exports.usuarioEmptyValidation = () => {
    return [
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length === 0) {
                throw new Error('No envíe nada en el cuerpo');
            }
            return true;
        }),
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length === 0) {
                throw new Error('No envíe nada en la URL');
            }
            return true;
        })
    ];
};
