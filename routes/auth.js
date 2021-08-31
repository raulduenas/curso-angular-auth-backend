const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Crear un nuevo usuario
router.post( '/new', [
    check('name', 'El usuario es obligatorio y no puede ser vacio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6}),
    validarCampos
], crearUsuario );

//Login usuario
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6}),
    validarCampos
], loginUsuario);

//Validar y revalidar token
router.get( '/renew', validarJWT, revalidarToken);

module.exports = router;