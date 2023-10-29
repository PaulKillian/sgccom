import React, { useEffect, useState } from 'react';
import CalendarLogin from '../Calendar/CalendarLogin';
import { supabase } from '../SupaBase'
import ApiCalendar from 'react-google-calendar-api';
import Calendar from '../Calendar/Calendar';

const EventCheck = ({apiCalendar, getUserId}) => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('eventCheck').select()
        if (error) {
          throw new Error(error.message)
        }
        setEvents(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div>Error loading events: {error}</div>
  }

  const approveOrDeny = async (event, eventInfo) => {
    event.preventDefault();

    if(event.target.id === 'approve') {
      const event = {
        summary: eventInfo.summary,
        location: eventInfo.location,
        description: eventInfo.description,
        start: {
          dateTime: eventInfo.start,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: eventInfo.end,
          timeZone: 'America/Los_Angeles',
        },
      };
    
      apiCalendar
        .createEvent(event)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      const { error } = await supabase
      .from('eventCheck')
      .delete()
      .filter('id', 'eq', eventInfo.id)
      .filter('uuid', 'eq', eventInfo.uuid)
      .select()
    } else {
      const { error } = await supabase
      .from('eventCheck')
      .delete()
      .filter('id', 'eq', eventInfo.id)
      .filter('uuid', 'eq', eventInfo.uuid)
      .select()
    }  
  }
  
    // const list = await apiCalendar.listUpcomingEvents(10).then(({ result }) => {
    //   console.log('ressss', result.items);
    // })
    // console.log(list)
  return (
    <div>
      {(events.length === 0)
        ? <div className={'mr-auto'}>
            <h1 className='text-center'>There are no events</h1>
            <Calendar />
          </div>
        : <div>
          <div className='d-flex flex-wrap justify-content-around'>
            {events.map((eventInfo) => {
            return (
              <div
                key={eventInfo.id}
                id={eventInfo.uuid}
                className="card" style={{width: '18rem'}}
              >
                <div id={eventInfo.id} className="card-body">
                  <h5 className="card-title">Event</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{eventInfo.summary}</h6>
                  <p className="card-text">{eventInfo.description}</p>
                  <p className="card-text">{eventInfo.location}</p>
                  <p className="card-text">{eventInfo.start}</p>
                  <p className="card-text">{eventInfo.end}</p>
                  <button 
                    onClick={(event) => { approveOrDeny(event, eventInfo)}}
                    type="submit" 
                    class="btn btn-primary" 
                    id={'approve'}>
                      Approve
                  </button>
                  <button 
                    onClick={(event) => { approveOrDeny(event, eventInfo)}}
                    type="submit" 
                    class="btn btn-secondary"
                    id={'deny'}>
                      Deny
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Calendar />
      </div>
    }
    </div>
  )
}

export default EventCheck

