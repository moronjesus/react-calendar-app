const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next) =>{

    //x-token headers
    const token = req.header('x-token');

            if( !token ){

                return res.status(401).json({
                    ok: false,
                    msg: 'No hay token en la peticion'
                });

            }
            
            try {

                const payload = jwt.verify(
                    token,
                    process.env.SECRET_JWT_SEED,
                )
                
                req.uid = payload.uid;
                req.name = payload.name;
                
            } catch (error) {

                res.status(401).json({
                    ok: false,
                    msg: 'token invalido'

                });

            }


    next();


}

module.exports = {
    validateJWT
}