import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA-Njz-Uc1Ij_zeoNF18Pow2-zTF9BSBXs',
  authDomain: 'gif-viewer-afe0e.firebaseapp.com',
  projectId: 'gif-viewer-afe0e',
  storageBucket: 'gif-viewer-afe0e.appspot.com',
  messagingSenderId: '392531179914',
  appId: '1:392531179914:web:1f96cf26719595e46b3073',
  measurementId: 'G-HYV1JXPFFL'
}

const app = firebase.initializeApp(firebaseConfig)
const startFB = () => firebase.initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)

export { db, startFB, auth }