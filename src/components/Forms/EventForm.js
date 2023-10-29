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
    type: 'datetime-local', 
    label: 'start'
  },
  {
    type: 'datetime-local', 
    label: 'end'
  },
  {
    type: 'button', 
    name: 'Submit'
  },
]

export const handleSubmit = async (eventSubmission, eventId) => {
  const {summary, location, description, start, end } = eventSubmission 
  
  const { data, error } = await supabase
    .from('eventCheck')
    .insert({ 
      id: eventId,
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

