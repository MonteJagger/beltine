import { AuthContext } from "@/services/auth/AuthContext"
import AuthService from "@/services/auth/AuthService"
import { User } from "firebase/auth"
import { useState, useEffect } from "react"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    // on initial load check to see if the user is logged in
    useEffect(() => {
        async function fetchUser() {
            const currentUser = await AuthService.getUser()
            if (!currentUser) return

            setUser(currentUser)
            setIsAuthenticated(!!currentUser)
        }

        fetchUser()
    }, [])

    async function createAccount(email: string, phoneNumber: string, password: string) {
        try {
            await AuthService.createAccount(email, phoneNumber, password)
            const currentUser = await AuthService.getUser()
            setUser(currentUser)
            setIsAuthenticated(!!currentUser)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('An unexpected error occurred. Please try again later.')
            }
        }
    }

    async function signIn(email: string, password: string) {
        try {
            await AuthService.signIn(email, password)
            const currentUser = await AuthService.getUser()
            setUser(currentUser)
            setIsAuthenticated(!!currentUser)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('An unexpected error occurred. Please try again later.')
            }
        }
    }
    async function signOut() {
        try {
            await AuthService.signOut()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('An unexpected error occurred. Please try again later.')
            }
        }
    }

    const authValue = {
        isAuthenticated,
        user,
        createAccount,
        signIn,
        signOut
    }

    return <AuthContext.Provider value={authValue} > {children}</AuthContext.Provider >
}