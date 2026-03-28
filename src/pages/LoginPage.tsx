
import '../styles/PageStyle.css'
import useBackend from '../hook/useBackend';

export const Login = () => {

    const { formData, setFormData, handleLogin, error } = useBackend()
    return (
        <div className='main'>
            <h3>Fitness</h3>
            <div className="form">
                <h3>Login Here</h3>
                <label>Username:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    autoFocus
                    onChange={e => {
                        setFormData({ ...formData, email: e.target.value });
                    }} />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={e => {
                        setFormData({ ...formData, password: e.target.value });
                    }} />
                <button className="register-button" onClick={() => handleLogin(formData)}>Login</button>
                {error && <p className="error-text">{error}</p>}
                <p>Don't have an account <a href="/home">Sign In</a></p>
            </div>
        </div>
    )
}
export default Login;