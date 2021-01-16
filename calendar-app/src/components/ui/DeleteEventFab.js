import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { startDeletedEvent } from '../../actions/events';

export const DeleteEventFab = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () =>{

        dispatch( startDeletedEvent() )
    }

    return (
        <div className={classes.root} >
            <Fab 
                color="secondary" 
                aria-label="delete"
                onClick = { handleDelete }
            >
                <DeleteIcon  />
            </Fab>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        bottom:95,
        padding:25,
        position: 'fixed',
        right: 25,
      },
    },
  }));