import React, {useState} from 'react';
import './SignIn.css'

const SignIn = () => {
// const { data, error } = await supabase.auth.signUp(
//   {
//     email: 'example@email.com',
//     password: 'example-password',
//     options: {
//       data: {
//         first_name: 'John',
//         age: 27,
//       }
//     }
//   }
// )

const [firstName, setFirstName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleFirstNameChange = (e) => {
  setFirstName(e.target.value);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission logic here (e.g., API calls)
  console.log('First Name:', firstName);
  console.log('Email:', email);
  console.log('Password:', password);
};

  return (
    <><div className="flex flex-center">
      <div className='sign-image'></div>
      <div className='sign-color'></div>
    </div>
    <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Sign Up / Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" value={firstName} onChange={handleFirstNameChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
              </div>
              <button type="submit" className="btn btn-primary mr-2">Sign Up</button>
              <button type="submit" className="btn btn-secondary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default SignIn