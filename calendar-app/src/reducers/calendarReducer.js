import { types } from "../types/types";


/* {
    id: new Date().getTime(),
    title: 'Cumpleaños feliz',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fefefe',
    notes: 'comprar el pastel',
    user:{
        _id: '123',
        name: 'Junior',
    }
} */

const initialState = {

        events:[],
        activeEvent: null

}

export const calendarReducer = ( state = initialState, action ) =>{

    switch ( action.type ) {
        case types.eventAddNew:
            
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload,
                ]
            };
            
        case types.eventSetActive:
            
            return{
                ...state,
                activeEvent: action.payload,

            };
            
        case types.eventClearActiveEvent:
            
            return{
                ...state,
                activeEvent: null
            };    
        case types.eventUpdated:
            
            return{
                ...state,
                events: state.events.map((eve) =>(
                      ( eve.id === action.payload.id )
                      ? action.payload
                      : eve   
                      
                ))
            };

            case types.eventDeleted:
            
                return{
                    ...state,
                    events: state.events.filter((eve) =>(
                          ( eve.id !== state.activeEvent.id )
                          
                    )),
                    activeEvent: null,
                };
                
                case types.eventLoaded:
            
                    return{
                        ...state,
                        events: [
                            ...action.payload
                        ]
                    };
                    
                case types.eventLogoutClear:
            
                    return{
                      ...initialState
                    };      

        default:
            return state;
    }
}