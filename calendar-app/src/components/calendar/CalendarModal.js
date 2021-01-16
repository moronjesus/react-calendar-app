import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

import { uiActionCloseModal } from '../../actions/ui';
import { actionClearActiveEvent, startAddNewEvent, startUpdateEvent } from '../../actions/events';


const now = moment().minutes(0).seconds(0).add(1, 'hours');
const hourMore = now.clone().add(1, 'hours');

const initialEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: hourMore.toDate(),
}

export const CalendarModal = () => {

    const classes = useStyles();
    const { modal } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [ formValues, setFormValues ] = useState( initialEvent );
    const { title, notes, start, end } = formValues;
    const [ open, setOpen ] = useState(false);
    const [messageInfo, setMessageInfo] = React.useState('');
   
    useEffect(() => {
       
        if(activeEvent){
            setFormValues(activeEvent);
           
        }else{

            setFormValues( initialEvent )
        }
        
    }, [activeEvent, setFormValues,])


    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e,
        })
    }

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e,
        })
    }

    const handleClose = () =>{   
        dispatch( uiActionCloseModal() );
        dispatch( actionClearActiveEvent() );
        setFormValues( initialEvent );

    }


    const handletSubmitForm = (e) => {

        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {

            setMessageInfo( 'La fecha fin debe ser mayor a la fecha de inicio')
            return setOpen(true);;
        }

        if(title.trim().length < 2 ){

            setMessageInfo('El campo titulo es obligatorio')
            return setOpen(true);
        }
        
        if(notes.trim().length < 2 ){
            
            setMessageInfo('El campo nota es obligatorio')
            return setOpen(true);
        } 
        if( activeEvent ){

            dispatch( startUpdateEvent( formValues ) );

        } else{

            dispatch( startAddNewEvent( formValues ))
        }
        
        handleClose();

      
    }

    const closeSnackbar = () =>{

        setOpen(false)
    }


    return (
        <div>

            <Dialog open={ modal } onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={ !modal }>

                <form className={classes.root} noValidate autoComplete="off" onSubmit={handletSubmitForm}>
                    {
                        (activeEvent )
                        ? <DialogTitle id="form-dialog-title">Editando evento</DialogTitle>
                        : <DialogTitle id="form-dialog-title">Nuevo evento</DialogTitle>
                    }
                   
                    <Divider />
                    <DialogContent>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                             <KeyboardDateTimePicker
                                variant="inline"
                                ampm={false}
                                label="Inicio de vento"
                                value={start}
                                onChange={handleStartDateChange}
                                format="yyyy/MM/dd HH:mm"
                            />

                            <KeyboardDateTimePicker 
                                variant="inline"
                                ampm={false}
                                label="Fin de evento"
                                value={end}
                                onChange={handleEndDateChange}
                                format="yyyy/MM/dd HH:mm"
                                minDate={start}
                                
                            />

                        </MuiPickersUtilsProvider>

                        <DialogTitle >
                            Titulo y notas 
                        </DialogTitle>

                        <Snackbar 
                        open={open} 
                        autoHideDuration={4000} 
                        onClose={closeSnackbar} 
                        ContentProps={{
                            className: classes.snackbarColor
                          }}
                        message={ messageInfo }>
                            
                        </Snackbar>

                        <TextField
                            id="outlined-basic"
                            label="Título "
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            
                        />

                        <TextField
                            id="outlined-textarea"
                            label="Nota"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        />

                    </DialogContent>
                    <DialogActions>

                        <Button
                            onClick={handleClose}
                            color="primary"
                        >
                            Cancel
                        </Button>

                        <Button
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>

                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0.9),
        },
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },

      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },

      snackbarColor:{
          backgroundColor:'#cd2f2f',
         
      }
    
}));
