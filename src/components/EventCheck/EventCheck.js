import React, { useEffect, useState } from 'react';
import CalendarLogin from '../Calendar/Calendar';
import { supabase } from '../SupaBase'
import ApiCalendar from 'react-google-calendar-api';

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
      const eventFromNow = {
        summary: eventInfo.summary,
        location: eventInfo.location,
        description: eventInfo.description,
        time: 90,
        start: {
          dateTime: new Date().toISOString(),
          timeZone: "Europe/Paris",
        },
        end: {
          dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
          timeZone: "Europe/Paris",
        },
      };
    
      apiCalendar
        .createEventFromNow(eventFromNow)
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
      console.log(event.target.id, eventInfo.id)
    }  
  }
  
    // const list = await apiCalendar.listUpcomingEvents(10).then(({ result }) => {
    //   console.log('ressss', result.items);
    // })
    // console.log(list)

  return (
    <div>
      {(events.length === 0)
        ? <h1 className={'d-flex justify-content-center'}>There are no events</h1>
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
        <div className='d-flex justify-content-around'>
          <iframe src='https://calendar.google.com/calendar/embed?src=psk65lava%40gmail.com&ctz=America%2FLos_Angeles' 
            style={{
              position: 'relative', 
              top:'0',
              left:'0',
              bottom:'0', 
              right:'0',
              width:'70%', 
              height:'70vh',
              border:'none', 
              margin:'0',
              padding:'0',
              overflow:'hidden' 
            }}
          >
          </iframe>
        </div>
      </div>
    }
    </div>
  )
}

export default EventCheck

