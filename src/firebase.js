import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

console.log(process.env.GOOGLE_API_KEY)

const firebaseConfig = {
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "clone-32628.firebaseapp.com",
    projectId: "clone-32628",
    storageBucket: "clone-32628.appspot.com",
    messagingSenderId: "339211187378",
    appId: "1:339211187378:web:f9167445d4e8b212ea45ab",
    measurementId: "G-B312XLK6FY"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth };

