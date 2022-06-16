import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAGpMjpiODQIbAPPPGPPZYXL6W2zq9g7WA',
  authDomain: 'react-redux-firebase-87827.firebaseapp.com',
  projectId: 'react-redux-firebase-87827',
  storageBucket: 'react-redux-firebase-87827.appspot.com',
  messagingSenderId: '113576793732',
  appId: '1:113576793732:web:fda777e067359dec0894d1',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
