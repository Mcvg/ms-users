const { body, validationResult } = require('express-validator');

exports.validateUsuario = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo debe ser válido')
    .isLength({ max: 50 }).withMessage('El correo no puede exceder los 50 caracteres'),
  body('contraseña')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 15 }).withMessage('La contraseña debe tener entre 8 y 15 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
