import '../styles/PageStyle.css'
import React, { useState } from 'react';
import { UserDataTypes } from '../types/UserDetails';
// import { useNavigate } from 'react-router-dom';



export const SignUp = () => {
 

  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState('');
  const [userValues, setUserValues] = useState<UserDataTypes[]>([])
  const [formData,setFormData] = useState<UserDataTypes>({
    id:'',
    name: '',
    email: '',
    password: ''
  })
  

  const handleRegister = async (data:UserDataTypes) => {

    console.log('coming the register data..', data);
    try{
    if (!data.name || !data.email || !data.password) {
      setError('Please fill in all fields');
      return alert("please enter the all fields");
    }else{
       console.log("formdata", formData)
       await fetch(`http://localhost:3006/signUp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: formData.id }),
       });
       setUserValues([...userValues, { ...formData }]);
    }
    }catch{
      alert("the user details not added to the db")
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
              <input className="first-name"type="text" placeholder="name" value={formData.name} autoFocus onChange={e => setFormData({...formData,name:e.target.value})}/>
            </div>
            <label>Email:</label>
            <input type="email" placeholder="Email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
            <label>Password:</label>
            <input type="password" placeholder="password" value={formData.password} onChange={e => setFormData({...formData,password:e.target.value})} />
            <label>Profile Image:</label>
            <div>
            <input type="file" onChange={()=>handleProfile} />
            <img src={fileSrc} alt="profile" />
            </div>
            <button className="register-button"onClick={()=>{handleRegister(formData)}}>Sign Up</button>
             {error && <p className="error-text">{error}</p>}
            <p>Already have an account <a href="/login">SignUp</a></p>
        </div>
    </div>
   )
}
export default SignUp;