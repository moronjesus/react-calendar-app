import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { uiActionOpenModal } from '../../actions/ui';
import { actionClearActiveEvent } from '../../actions/events';

export const AddNewFab = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOpenModal = () =>{

        dispatch( uiActionOpenModal() );
        dispatch( actionClearActiveEvent() );
        
    }

    return (
        <div className={classes.root} >
            <Fab 
                color="primary" 
                aria-label="add"
                onClick= { handleOpenModal }
            >
                <AddIcon />
            </Fab>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        bottom:25,
        padding:25,
        position: 'fixed',
        right: 25,
      },
    },
  }));