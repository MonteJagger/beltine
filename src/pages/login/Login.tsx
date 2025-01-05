import { useState } from "react"
import './Login.scss'

function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <h1>Login</h1>
            <form className="form">
                <div className="input-group email">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" value={name} onChange={(e) => setName(e.target.value)} name="email" />
                </div>

                <div className="input-group password">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="cta-buttons">
                    <button type="submit" className="btn-forgot">Forgot Password?</button>
                    <button type="submit" className="btn-login">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login