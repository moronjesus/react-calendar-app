/* {
    ok: true,
    msg:'obtener eventos'
} */
const { response } = require('express');
const Events = require('../models/Events');
const Event = require('../models/Events')


const getAllEvents = async ( req, res = response ) =>{

        const events = await Event.find().populate('user', 'name');
                                
        res.status(201).json({
            ok:true,
            msg: events,
        });

};



const createEvent = async ( req, res = response ) =>{

        const event = new  Event(req.body);

        try {

            event.user = req.uid;

            const eventSave = await event.save();
            res.status(201).json({
                ok:true,
                event: eventSave,
            });


        } catch (error) {
            
            res.status(500).json({
                ok: false,
                msg: 'hable con el administrador'
            })

        }

};



const updateEvent = async ( req, res = response ) =>{

        const eventId = req.params.id;
        const uid = req.uid;

        try {

            const event = await Events.findById( eventId );

            if( !event ){
                return res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe por ese Id'
                })
            }

            if( event.user.toString() !== uid){
                
                return res.status(401).json({
                    ok: false,
                    msg:'No tiene privilegio de editar el evento'
                });

            }

            const newEvent = {
                ...req.body,
                user: uid
            }

            const eventUpdate = await Event.findByIdAndUpdate( eventId, newEvent, {new : true} );

            res.json({
                ok: true,
                event: eventUpdate,
            })

            
        } catch (error) {

            res.status(500).json({
                ok:false,
                msg: 'hable con el administrador'
            });
            
        }

};




const deleteEvent = async ( req, res = response ) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Events.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            })
        }

        if( event.user.toString() !== uid){
            
            return res.status(401).json({
                ok: false,
                msg:'No tiene privilegio de eliminar el evento'
            });

        }


        await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true,
            event: 'Evento eliminado ',
        })

        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        });
        
    }

};

module.exports ={
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,

}
