const { body, check, validationResult, param, query } = require("express-validator");

// Validación para la creación de un nuevo ticket
exports.validateNewTicket = () => {
    return [
        body('id_cliente').notEmpty().withMessage('El ID del cliente es requerido').isMongoId().withMessage('El ID del cliente debe ser un ID de MongoDB válido'),
        body('asiento').notEmpty().withMessage('El asiento es requeridd').isArray().withMessage('El asiento debe ser un array'),
        body('sala').notEmpty().withMessage('La sala es requerida').isInt({ min: 1 }).withMessage('La sala debe ser un número entero positivo'),
        body('id_funcion').notEmpty().withMessage('El ID de la función es requerido').isMongoId().withMessage('El ID de la función debe ser un ID de MongoDB válido')
    ];
};

// Validación para la verificación del estado VIP del cliente
exports.validateVIPStatus = () => {
    return [
        body('targeta_vip').isBoolean().withMessage('El estado VIP debe ser verdadero o falso')
    ];
};

// Validación para verificar que la función exista
exports.validateFuncionExists = () => {
    return [
        param('funcionId').notEmpty().withMessage('El ID de la función es requerido').isMongoId().withMessage('El ID de la función debe ser un ID de MongoDB válido'),
        param('sala').notEmpty().withMessage('La sala es requerida').isString().withMessage('La sala debe ser una cadena de caracteres')
    ];
};

exports.boletaValidationEmpty = () => {
    return [
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length === 0) {
                throw new Error('No envíe nada en el cuerpo');
            }
            return true;
        }),
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length === 0) {
                throw new Error('No envíe nada en la url');
            }
            return true;
        })
    ];
};

// Middleware para manejar errores de validación
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};