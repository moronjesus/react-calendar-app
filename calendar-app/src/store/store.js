import { rootReducer } from "../reducers/rootReducer";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
   
)