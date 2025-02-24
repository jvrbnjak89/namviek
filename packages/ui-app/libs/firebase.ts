import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}
// Initialize Firebase
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const googleProvider = new GoogleAuthProvider()

export const signinWithGoogle = async (): Promise<{
  accessToken: string
  user: User
}> => {
  const auth = getAuth()
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)

        resolve({
          accessToken: credential?.accessToken || '',
          user: result.user
        })
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message
        console.log(errorCode, errorMessage)
        reject({ errorCode, errorMessage })
      })
  })
}
