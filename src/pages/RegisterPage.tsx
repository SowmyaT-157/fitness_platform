import '../styles/PageStyle.css'
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState('');

  const handleRegister = () => {
    console.log('user register register:', { firstName,email });
    if (!firstName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
  };
   function handleProfile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files != null) {
            setFile(e.target.files[0]); 
        }
   }
   const fileSrc = file ? URL.createObjectURL(file) : undefined;

   return(
    <div className='main'data-test-id="SignUp-form">
        <h3>Fitness-Application</h3>
        <div className='form'>
            <h3>Sign Up</h3>
            <label>Name:</label>
            <div className='name-container'>
              <input className="first-name"type="text" placeholder="first name" value={firstName} autoFocus onChange={e => setFirstName(e.target.value)}/>
            </div>
            <label>Email:</label>
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <label>Profile Image:</label>
            <div>
            <input type="file" onChange={()=>handleProfile} />
            <img src={fileSrc} alt="profile" />
            </div>
            <button className="register-button"onClick={handleRegister}>Sign Up</button>
             {error && <p className="error-text">{error}</p>}
            <p>Already have an account <a href="/login">SignUp</a></p>
        </div>
    </div>
   )
}
export default SignUp;