import { useState } from "react"
import './Login.scss'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <h1>Login</h1>
            <form className="form login-form">
                <div className="input-group email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="input-group password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </div>

                <div className="cta-buttons">
                    <button type="submit" className="btn-forgot">Forgot Password?</button>
                    <button type="submit" className="btn">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login