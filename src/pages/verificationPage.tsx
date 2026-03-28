
import useBackend from "../hook/useBackend";

export const Verify = () => {
    const{verifyForm,setVerifyForm,handleVerification} = useBackend()
    return(
    <div className='main'>
        <h3>Fitness</h3>
        <div className="form">
            <h3>Verify</h3>
            <label>Username:</label>
            <input 
              type="email" 
              placeholder="Email"
              value={verifyForm.email} 
              autoFocus 
              onChange={e=>{
                setVerifyForm({...verifyForm, email: e.target.value});
            } }/>
            
            <label>verification code:</label>
            <input 
              type="password" 
              placeholder="code"
              value={verifyForm.otp} 
              onChange={e=>{
                setVerifyForm({...verifyForm,otp:e.target.value})
            }} />
            <button className="register-button"onClick={()=>{handleVerification(verifyForm)}}>Verify</button>
        </div>
    </div>
    )
}
export default Verify;