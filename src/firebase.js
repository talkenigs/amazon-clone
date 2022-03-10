import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOEZCbYKKT_a1Z5uONAkfD21yLW8jPx-8",
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

