import { supabase } from '../SupaBase';
import Form from './Form'

export const eventFormData = [
  {
    type: 'text', 
    label: 'summary'
  },
  {
    type: 'text', 
    label: 'location'
  },
  {
    type: 'text', 
    label: 'description'
  },
  {
    type: 'text', 
    label: 'start'
  },
  {
    type: 'text', 
    label: 'end'
  },
  {
    type: 'button', 
    name: 'Submit'
  },
]

export const handleSubmit = async (eventSubmission) => {
  const {summary, location, description, start, end } = eventSubmission 
  // e.preventDefault();
  // const eventSubmission = {
  //   'summary': 'Google I/O 2015',
  //   'location': '800 Howard St., San Francisco, CA 94103',
  //   'description': 'A chance to hear more about Google\'s developer products.',
  //   'start': {
  //     'dateTime': '2015-05-28T09:00:00-07:00',
  //     'timeZone': 'America/Los_Angeles'
  //   },
  //   'end': {
  //     'dateTime': '2015-05-28T17:00:00-07:00',
  //     'timeZone': 'America/Los_Angeles'
  //   },
  // };

  const { data, error } = await supabase
    .from('eventCheck')
    .insert({ 
      id: 1, 
      summary,
      location,
      description,
      start,
      end
    })
    .select()
}   

const EventForm = () => {
  return (
    <Form 
      formData={eventFormData}
      handleSubmit={handleSubmit}
    />
  )
}

export default EventForm

