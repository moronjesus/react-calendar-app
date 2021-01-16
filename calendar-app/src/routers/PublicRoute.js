import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAunthenticated,
    component: Component,
    ...rest

}) => {
    return (
        <Route { ...rest }
        component = {( props ) =>(
            ( isAunthenticated )
            ? ( <Redirect to ="/" /> )
            : ( <Component { ...props } />)

        )}
          
            
        />
    )
}


PublicRoute.propTypes = {
    isAunthenticated: PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired,

}
