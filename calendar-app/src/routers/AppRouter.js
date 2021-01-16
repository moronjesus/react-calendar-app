import React, { useEffect } from 'react';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
     
        dispatch( startChecking() );

    }, [dispatch])

    if(checking){
        return (<h5>Espere...</h5>)
    }

    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAunthenticated= { !!uid } 
                    />
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen }
                        isAunthenticated= { !!uid }  
                    />

                    <Redirect to= "/auth/login" />
                </Switch>
            </div>
        </Router>

    )
}
