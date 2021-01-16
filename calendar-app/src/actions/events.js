import Swal from "sweetalert2";
import { prepareEvent } from "../helpers/date-events";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types"


export const startAddNewEvent = ( event ) =>{ 

    return async ( dispatch, getState ) =>{

        const { uid, name } = getState().auth;

            try {
 
            const resp = await fetchConToken('event', event, 'POST');
            const body = await resp.json();

            if(body.ok){
                event.id = body.event.id;
                event.user ={
                    _id: uid,
                    name: name
                }
                Swal.fire({
                    icon: 'success',
                    text: 'Registro éxitoso',
                  });
                dispatch( actionAddNewEvent( event ) )

            }
           

                
            } catch (error) {
                
            }
    }


};



const actionAddNewEvent = ( event ) =>({ 
    type: types.eventAddNew,
    payload: event

});



export const actionSetActive = ( event ) =>({ 
    type: types.eventSetActive,
    payload: event

});



export const actionClearActiveEvent = ( ) =>({ 
    type: types.eventClearActiveEvent,

});



export const startUpdateEvent = ( event ) =>{

    return async ( dispatch )=>{
        
        try {

            const resp = await fetchConToken( `event/${event.id}`, event, 'PUT' );
            const body = await resp.json();

            if(body.ok){

                Swal.fire({
                    icon: 'success',
                    text: 'Evento modificado con éxitoso',
                  });

                dispatch( actionUpdateActiveEvent(event) );

            }else{
                Swal.fire('Eror', body.msg, 'error')
            }
            

            
        } catch (error) {
            
            console.log(error);
        }

    }

}

export const actionUpdateActiveEvent = ( event ) =>({ 
    type: types.eventUpdated,
    payload: event

});


export const startDeletedEvent = ( ) =>{

    return async ( dispatch, getState )=>{
        
        const { id } = getState().calendar.activeEvent;

       
        try {

            const resp = await fetchConToken( `event/${id}`, {}, 'DELETE' );
            const body = await resp.json();

            if(body.ok){

                dispatch( actionDeletedEvent() );
                Swal.fire({
                    icon: 'info',
                    text: 'Evento eliminado',
                  })

            }else{
                Swal.fire('Eror', body.msg, 'error')
            }
            

            
        } catch (error) {
            
            console.log(error);
        }

    }

}

export const actionDeletedEvent = () =>({ 
    type: types.eventDeleted,

});



export const eventStartLoading = ( ) =>{
   
        return async( dispatch ) =>{

            try {
                
                const resp = await fetchConToken('event');
                const body = await resp.json();
    
                const events = prepareEvent( body.msg )
               dispatch( eventLoaded( events ) );
               
            } catch (error) {
                
                console.log(error);

            }      
    
        }
   
};



const eventLoaded = ( events ) =>({
    type: types.eventLoaded,
    payload: events,

});

export const eventLogoutClear = ({
    
    type: types.eventLogoutClear

})