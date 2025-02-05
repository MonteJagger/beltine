import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/services/auth/AuthContext";

function CreateAccount() {
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { createAccount } = useAuthContext()
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await createAccount(email, password)
            navigate('/dashboard')
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.')
            }
        }
    }

    function handleChangeEmail(email: string) {
        setEmail(email)
        setErrorMessage('')
    }

    function handlePhoneNumber(number: string) {
        // TODO add formatting
        setPhoneNumber(number)
        setErrorMessage('')
    }

    return (
        <>
            <h1>Create an Account</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => handleChangeEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="input-group phone-number">
                    <label htmlFor="tel"></label>
                    <input
                        type="tel"
                        id="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={e => handlePhoneNumber(e.target.value)}
                        required
                        autoComplete="tel"
                    />
                </div>

                <div className="input-group password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="error-message text-red-600">{errorMessage}</div>

                <div className="cta-buttons">
                    <button type="submit" className="btn">Create</button>
                </div>
            </form>
        </>
    )
}

export default CreateAccount