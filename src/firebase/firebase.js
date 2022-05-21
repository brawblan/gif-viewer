import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_GIPHY_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_GIPHY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_GIPHY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_GIPHY_FIREBASE_STROAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_GIPHY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_GIPHY_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_GIPHY_FIREBASE_MEASUREMENT_ID
}

const app = firebase.initializeApp(firebaseConfig)
const startFB = () => firebase.initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)

export { db, startFB, auth }