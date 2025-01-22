import cookies from "@/services/cookies";
import app from "@/services/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, AuthErrorCodes, UserCredential, onAuthStateChanged, User } from "firebase/auth";


const AuthService = {
  createAccount,
  signIn,
  getUser
}
 
export default AuthService

async function getUser(): Promise<User | null> {
  const auth = getAuth(app)

  return new Promise(resolve => {
    onAuthStateChanged(auth, user => resolve(user))
  })
}

async function createAccount(email: string, password: string) {
  try {
    const auth = getAuth(app)
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()
    cookies.set('idToken', idToken)
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code
      console.warn('error :>> ', error)

      if (errorCode.includes(AuthErrorCodes.EMAIL_EXISTS)) {
        throw new Error('Email already in use')
      } else if (errorCode.includes(AuthErrorCodes.CAPTCHA_CHECK_FAILED)) {
        throw new Error('Captcha failed. Please try again')
      } else if (errorCode.includes(AuthErrorCodes.WEAK_PASSWORD)) {
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
    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth, email, password)
    console.log('Successfully Sign In! ', email)
    // TODO: Set user cookies - store accessToken in the cookie
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode, errorMessage ', errorCode, errorMessage);
    } else {
      console.error('Unexpected error: ', error);
    }
  }
}