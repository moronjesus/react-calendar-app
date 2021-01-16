const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')


const User = require('../models/User');

const createUser = async( req, res = response ) =>{

   const { email, password } = req.body; 


    try {

        let user =  await User.findOne({ email });
            
            if( user ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }    
        

        user =  new User(req.body);

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(); 
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok:true,
            uid:user.id,
            name: user.name,
            token,
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
 
    
}

const login = async ( req, res = response ) =>{

    const { email, password } = req.body;

        try {

            const user =  await User.findOne({ email });
            
            if( !user ){
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario o contraseña no son correcto'
                });
            } 

            //Confirmar los password 
            const validPassword = bcrypt.compareSync( password, user.password );

            if(!validPassword ){

                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto',
                })
            }

            //Generar nuestro JWT
            const token = await generateJWT(user.id, user.name);

            res.json({
                ok:true,
                uid: user.id,
                name: user.name,
                token,
               
            })
            
        } catch (error) {
            
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            })
        }

    
}


const revalidateToken = async ( req, res = response ) =>{

    const { uid, name } = req;


    //generar nuevo token
    const token = await generateJWT( uid, name )

    res.json({
        ok:true,
        msg:'renew',
        token,
        uid,
        name
    })
}




module.exports = {
    createUser,
    login,
    revalidateToken
}