// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/* Firebase Remote Config is a cloud service that lets you change the behavior and appearance of your app 
   without requiring users to download an app update. */

// U have to start emulator to run this project the command for it is = firebase emulators:start

   import firebase from 'firebase/compat/app';
   import 'firebase/compat/auth';
   import 'firebase/compat/firestore';

   const firebaseConfig = {
  }; 
// paste your firebase config 

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };
