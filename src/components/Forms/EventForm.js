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

export const handleSubmit = async (eventSubmission, getUserId, eventId) => {
  const {summary, location, description, start, end } = eventSubmission 
  
  const uuid = await getUserId()
  const { data, error } = await supabase
    .from('eventCheck')
    .insert({ 
      id: eventId, 
      uuid: uuid[0].id,
      summary,
      location,
      description,
      start,
      end
    })
    .select()
}   

const EventForm = ({getUserId}) => {
  return (
    <Form 
      formData={eventFormData}
      handleSubmit={handleSubmit}
      getUserId={getUserId}
    />
  )
}

export default EventForm

