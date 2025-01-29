import { useState } from "react"
import './Login.scss'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/services/auth/AuthContext"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { signIn } = useAuthContext()
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await signIn(email, password)
            navigate('/dashboard')
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.')
            }
        }
    }

    const env = import.meta.env
    console.log('env :>> ', env)
    console.log('env :>> ', env.VITE_TEST_STRING)
    return (
        <>
            <h1>Login</h1>
            <form className="form login-form" onSubmit={handleSubmit}>
                <div className="input-group email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
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
                        required
                    />
                </div>

                <div className="error-message text-red-600">{errorMessage}</div>

                <div className="cta-buttons">
                    <button className="btn-forgot">Forgot Password?</button>
                    <button type="submit" className="btn">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login