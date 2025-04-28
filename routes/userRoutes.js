const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUsuario } = require('../middlewares/validateFields');

router.post('/usuarios', validateUsuario, userController.createUsuario);
router.post('/usuarios/roles', userController.assignRoleToUsuario);
router.get('/usuarios', userController.getUsuarioRoles);

module.exports = router;