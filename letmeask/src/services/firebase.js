import firebase from "firebase/app"

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDrKDVDtiW_clwHOD4DHAPyab9TDZiyjBc",
    authDomain: "letmeask-885c0.firebaseapp.com",
    databaseURL: "https://letmeask-885c0-default-rtdb.firebaseio.com",
    projectId: "letmeask-885c0",
    storageBucket: "letmeask-885c0.appspot.com",
    messagingSenderId: "762419438237",
    appId: "1:762419438237:web:fea0ec50cf034ec7dd2a74"
  };

firebase.initializeApp(firebaseConfig)

 const auth = firebase.auth()
 const database= firebase.database()


 export {firebase, auth, database}