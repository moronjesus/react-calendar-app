import { types } from "../types/types";

const initialState = {
    modal : false
}


export const uiReducer = ( state= initialState, action ) =>{

        switch (action.type) {
            case types.uiOpenModal:
                
                return {
                    ...state,
                    modal: true
                };

            case types.uiCloseModal:
                
                return {
                    ...state,
                    modal:false
                };    
        
            default:
                return state;
        }
}