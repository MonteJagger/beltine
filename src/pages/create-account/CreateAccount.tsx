import { useState } from "react";
import AuthService from "@/services/auth";

function CreateAccount() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await AuthService.createAccount(email, password)
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
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
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
                    />
                </div>

                <div className="cta-buttons">
                    <button type="submit" className="btn">Create</button>
                </div>
            </form>
        </>
    )
}

export default CreateAccount