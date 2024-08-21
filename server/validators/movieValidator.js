const { body, query, param, check, validationResult } = require("express-validator");

exports.peliculaValidationEmpty = () => {
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

exports.peliculalistingSpecifications = () => {
    return [
        check("titulo").optional().isString().withMessage("El titulo debe ser una cadena de caracteres"),
        check("genero").optional().isString().withMessage("El genero debe ser una cadena de caracteres")
    ]
}