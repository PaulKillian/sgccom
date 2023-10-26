
import { useState } from 'react'
import { eventData } from './AdminEventCheck'
import { supabase } from './SupaBase';

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const Form = ({formData}) => {
    const handleState = {};
    const [state, setState] = useState('');

    formData.forEach(arg => {
      handleState[arg] = ''
    });

    const handleChange = (event) => {
      setState(prevState => ({
        ...prevState,
        [event.target.id]: [event.target.value]
      }))
    }

    const handleSubmit = async () => {
      const event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2015-05-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2015-05-28T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
      };

      const { data, error } = await supabase
        .from('countries')
        .insert({ id: 1, name: 'Denmark' })
        .select()
    }    
    
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              {formData.map((data) => {
                return (
                  <div className="mb-3">
                    <input 
                      type={data.type} 
                      className="form-control" 
                      id={data.label} 
                      placeholder={data.label}
                      value={handleState.inputData} 
                      onChange={event => handleChange(event)} 
                      required 
                    />
                    {data.type === 'button' &&
                      <button 
                        type={data.type} 
                        className="btn btn-primary mr-2"
                      >
                        Sign Up
                      </button>
                    }
                  </div>
                ) 
              })}
            </form>
          </div>
        </div>
      </div>
    )
  }

  export default Form