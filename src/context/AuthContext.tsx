import { createContext, useContext, useEffect, useState } from "react"
import * as Auth from "firebase/auth";
import AuthService from "@/services/authService";


interface iAuthContext {
    isAuthenticated: boolean;
    user: Auth.User | null;
    createAccount: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}


export const AuthContext = createContext<iAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<Auth.User | null>(null)

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

    async function createAccount(email: string, password: string) {
        try {
            await AuthService.createAccount(email, password)
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

export const useAuthContext = (): iAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }
