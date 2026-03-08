import useBackend from '../hook/useBackend';
import '../styles/PageStyle.css'



export const SignUp = () => {

  const { formData, setFormData, handleRegister, error,uploading,handleUpload,setFile,file,sendOtp } = useBackend()

  return (
    <div className='main' data-test-id="SignUp-form">
      <h3>Fitness-Application</h3>
      <div className='form'>
        <h3>Sign Up</h3>
        <label>Name:</label>
        <div className='name-container'>
          <input className="first-name" type="text" placeholder="name" value={formData.name} autoFocus onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <label>Email:</label>
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <label>Password:</label>
        <input type="password" placeholder="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
        <label>Profile Image:</label>
        <div>
           <input type="file"accept="image/jpeg" onChange={(e) => setFile(e.target.files?.[0] || null)}/>
           <button onClick={handleUpload} disabled={!file || uploading}> {uploading ? 'Uploading…' : 'Upload'}</button>
        </div>
        
       <button className="register-button" onClick={ ()=>{ sendOtp(formData) }}>Sign UP</button>
        <button className="register-button" onClick={() => { handleRegister(formData) }}>send OTP</button>
        {error && <p className="error-text">{error}</p>}
        <p>Already have an account <a href="/verify">SignUp</a></p>
      </div>
    </div>
  )
}
export default SignUp;