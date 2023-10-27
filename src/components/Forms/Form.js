
import { useState } from 'react'
import { eventData } from '../AdminEventCheck'

  const Form = ({formData, handleSubmit}) => {
    const formElements = {};
    const [state, setState] = useState('');

    formData.forEach(arg => {
      formElements[arg] = ''
    });

    const handleChange = (event) => {
      setState(prevState => ({
        ...prevState,
        [event.target.id]: event.target.value
      }))
    } 
    
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              {formData.map((data, index) => {
                return (
                  <div className="mb-3">
                    {data.type !== 'button' &&
                      <input 
                        key={index}
                        type={data.type} 
                        className="form-control" 
                        id={data.label} 
                        placeholder={data.label}
                        value={formElements.inputData} 
                        onChange={event => handleChange(event)} 
                        required 
                      />
                    }
                    {data.type === 'button' &&
                      <button onClick={() => {handleSubmit(state)}} 
                        key={index}
                        type={data.type} 
                        className="btn btn-primary mr-2"
                      >
                        {data.name}
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