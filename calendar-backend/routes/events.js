/**
 * Event Routes
 * /api/event
 */

const { Router } = require('express');
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateField } = require('../middlewares/validate-field');
const isDate = require('../helpers/isDate');
const route = Router();

//Todas tiene que pasar por la validacion del JWT

/**
 * esto es para sustituir la validacion del JWT en todas las peticiones y no repetirla por cada una
 * route.use( validateJWT );
 */


route.get(
    '/',
     [
        check('title', 'titulo debe ser mayor a 2 caracteres').notEmpty(),
        validateJWT,
     ],
      getAllEvents 
    );


route.post(
    '/',
    [
        check('title', 'titulo no debe estar vacio').notEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validateJWT,
        validateField,
    ],
    createEvent 
);


route.put('/:id', validateJWT, updateEvent );


route.delete('/:id', validateJWT, deleteEvent );


module.exports = route