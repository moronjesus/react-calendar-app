import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAunthenticated,
    component: Component,
    ...rest

}) => {


    return (
        <Route { ...rest }
        component = {( props ) =>(
            ( isAunthenticated )
            ? ( <Component { ...props } />)
            : ( <Redirect to ="/auth/login" /> )

        )}
          
            
        />
    )
}

PrivateRoute.propTypes = {
    isAunthenticated: PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired,

}