import cookies from "@/services/cookies";
import app from "@/services/firebase";
import { FirebaseError } from "firebase/app";
import * as Auth from "firebase/auth";


const AuthService = {
  createAccount,
  signIn,
  getUser,
  signOut
}
 
export default AuthService

async function getUser(): Promise<Auth.User | null> {
  const auth = Auth.getAuth(app)

  return new Promise(resolve => {
    Auth.onAuthStateChanged(auth, user => resolve(user))
  })
}

async function createAccount(email: string, password: string) {
  try {
    const auth = Auth.getAuth(app)
    const userCredential: Auth.UserCredential = await Auth.createUserWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()
    cookies.set('idToken', idToken)
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code
      console.warn('error :>> ', error)

      if (errorCode === Auth.AuthErrorCodes.EMAIL_EXISTS) {
        throw new Error('Email already in use')
      } else if (errorCode === Auth.AuthErrorCodes.CAPTCHA_CHECK_FAILED) {
        throw new Error('Captcha failed. Please try again')
      } else if (errorCode === Auth.AuthErrorCodes.WEAK_PASSWORD) {
        throw new Error('Password should be at least 6 characters')
      } else {
        throw new Error('There has been an issue creating your account. Please try again later.')
      }
    } else {
      console.error('Unexpected error: :>> ', error)
      throw new Error('There has been an issue creating your account. Please try again later.')
    }
  }
}

async function signIn(email: string, password: string) {
  try {
    const auth = Auth.getAuth(app)
    await Auth.signInWithEmailAndPassword(auth, email, password)
    console.log('Successfully Sign In! ', email)
    // TODO: Set user cookies - store accessToken in the cookie
  } catch (error) {
    if (error instanceof FirebaseError) {
      // const errorCode = error.code;
      console.warn('error :>> ', error)

      // TODO: add error codes conditions and throw error object
    } else {
      console.error('Unexpected error: ', error)
      // TODO: throw error object
    }
  }
}

async function signOut() {
  try {
    const auth = Auth.getAuth(app)
    await Auth.signOut(auth)
    cookies.remove('idToken')
    console.log('Signed Out! ')
  } catch (error) {
    // TODO: handle error. Possibly a banner?
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode, errorMessage ', errorCode, errorMessage);
    } else {
      console.error('Unexpected error: ', error);
    }
  }
}