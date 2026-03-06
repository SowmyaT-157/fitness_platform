
import { useState } from "react";
import { UserDataTypes, verifyDataTypes } from "../types/UserDetails";

const useBackend = () =>{
    
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
                return "successfully verified"
               }
            }
        }catch{
            alert("email and verification code check once")
        }
        };
    
    return{
       handleRegister,
       setFormData,
       formData,
       error,
       setError,
       verifyForm,
       setVerifyForm,
       handleVerification

    }
}
export default useBackend;