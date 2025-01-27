import { User } from "firebase/auth"
import { createContext, useContext } from "react"

interface iAuthContext {
  isAuthenticated: boolean
  user: User | null
  createAccount: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<iAuthContext | undefined>(undefined)

export const useAuthContext = (): iAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
