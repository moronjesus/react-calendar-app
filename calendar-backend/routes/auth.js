/**
 * Rutas de Usuario /Auth
 * host + /api/auth
 */

const { Router } = require('express');
const router  = Router();
const { createUser, login ,revalidateToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/register', 
    [
       check('name', 'Este campo es obligatorio').not().isEmpty(),
       check('email', 'Este campo es obligatorio').isEmail(),
       check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6}),
       validateField
    ],
 createUser );

router.post(
    '/',
    [
      check('email', ' El email es incorrecto').isEmail(),
      check('password', 'EL pasword debe ser mayor a 6 caracteres').isLength({ min: 6}),
      validateField  
    ],
 login );

router.get('/renew', validateJWT, revalidateToken );



module.exports = router;