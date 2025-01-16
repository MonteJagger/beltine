import app from "@/services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";


const AuthService = {
  createAccount,
  signIn
}

export default AuthService

async function createAccount(email: string, password: string) {
  try {
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, email, password)
    console.log('Successfully Created Account!', email)
    // TODO: Set user cookies - store accessToken in the cookie
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log('errorCode, errorMessage', errorCode, errorMessage)
  }
}

async function signIn(email: string, password: string) {
  try {
    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth, email, password)
    console.log('Successfully Sign In!', email)
    // TODO: Set user cookies - store accessToken in the cookie
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log('errorCode, errorMessage', errorCode, errorMessage)
  }
}