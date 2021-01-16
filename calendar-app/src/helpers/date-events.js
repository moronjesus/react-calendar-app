import moment from 'moment'

export const prepareEvent = ( events = [] )=>{
    
    return events.map(
        ( eve ) =>({

            ...eve,
            end: moment( eve.end).toDate(),
            start: moment( eve.start).toDate(),

        })
    ) 
}