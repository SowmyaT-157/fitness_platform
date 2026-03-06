
import { useState } from "react";
import { signInDataTypes, UserDataTypes, verifyDataTypes } from "../types/UserDetails";
import { useNavigate } from "react-router-dom";

const useBackend = () =>{
      const navigate = useNavigate();
      const [error, setError] = useState('');
      const [userValues, setUserValues] = useState<UserDataTypes[]>([])
      const [formData,setFormData] = useState<UserDataTypes>({
          id:'',
          name: '',
          email: '',
          password: ''
        })
      const [verifyForm, setVerifyForm] = useState<verifyDataTypes>({
        email:'',
        code:''
      });
    
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
           navigate('/verify');
        }
        }catch{
          alert("the user details not added to the db")
        }
      };


     const handleVerification = async (data:verifyDataTypes) => {
        console.log('coming the register data..', data);
        try{
            if (!data.email || !data.code) {
              return alert("please enter the all fields");
            }else{
               const responseData = await fetch(`http://localhost:3006/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: data.email, code: data.code  }),
               });
              
               if(!responseData){
                return "verification failed"
               }else{
                alert("successfully verified the email")
                navigate('/signIn');
                return "successfully verified"
                
               }
            }
        }catch{
            alert("email and verification code check once")
        }
    };
    const handleLogin = async(data:signInDataTypes) =>{
      try{
        if (!data.email || !data.password) {
          setError('Please fill in all fields');
          return alert("please enter the all fields");
        }else{
           console.log("formdata", formData)
           await fetch(`http://localhost:3006/signIn`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...formData, id: formData.id }),
           });
          //  setUserValues([...userValues, { ...formData }]);
           navigate('/home');
        }
        }catch{
          alert("the email and password not matched to user")
        }

    }
    
    return{
       handleRegister,
       setFormData,
       formData,
       error,
       setError,
       verifyForm,
       setVerifyForm,
       handleVerification,
       handleLogin
    }
}
export default useBackend;