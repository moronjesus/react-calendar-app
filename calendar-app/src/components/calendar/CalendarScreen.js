import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiActionOpenModal } from '../../actions/ui';
import { actionClearActiveEvent, actionSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {

    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month' );
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );


    useEffect(() => {
      
        dispatch( eventStartLoading());
        
    }, [dispatch])

    const onDoubleClick = (e) =>{
        dispatch( uiActionOpenModal() );
    }


    const onSelectEvent = (e) =>{
        dispatch( actionSetActive(e) );
    }


    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
        
    }  
    const onSelectSlot = (e) =>{
        dispatch( actionClearActiveEvent() )
    }    


    const eventStyleGetter= ( event, start, end, isSelected ) =>{


      const style = {
          boxShadow: '2px 2px 8px 0 #BEBFC2',
          backgroundColor: (event.user._id === uid ) ?'#091175' : '#D0E726',
          borderRadius: '4px',
          opacity: 0.8,
          display:'block',
          color: '#ffffff',
          fontFamily:'Helvetica, Arial, sans-serif',
          marginTop:2,
          marginBottom:2,
          padding: 3,
          fontSize: 14
          
      }

      return{
          style
      }

    }

    const calendarStyle = () =>{

       const  style = {
            margin:2,
            boxShadow:' 0px 1px 1px #c2c2c2',
           
          }

          return{
            style
        }
    }

    return (
        <div>
            <NavBar />

            <div className="container">
                <Card className="card">
                    <CardContent>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            messages= { messages }
                            onDoubleClickEvent={ onDoubleClick }
                            onSelectEvent = { onSelectEvent }
                            onSelectSlot= { onSelectSlot }
                            selectable = { true }
                            className="calendar-screen"
                            eventPropGetter = { eventStyleGetter }
                            dayPropGetter= { calendarStyle }
                            onView = { onViewChange }
                            view= { lastView }
                            components= {{
                              event:  CalendarEvent
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
            <AddNewFab />
            
             {
                 activeEvent &&
                 <DeleteEventFab />
             }               
           
            <CalendarModal />
        </div>
    )
}
