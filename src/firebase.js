// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/* Firebase Remote Config is a cloud service that lets you change the behavior and appearance of your app 
   without requiring users to download an app update. */

// U have to start emulator to run this project the command for it is = firebase emulators:start

   import firebase from 'firebase/compat/app';
   import 'firebase/compat/auth';
   import 'firebase/compat/firestore';

   const firebaseConfig = {
    apiKey: "AIzaSyARxavVrbPr_ONtfrgGLFn99Bq_UxiJH4Y",
    authDomain: "clone-3ccac.firebaseapp.com",
    projectId: "clone-3ccac",
    storageBucket: "clone-3ccac.appspot.com",
    messagingSenderId: "332399401494",
    appId: "1:332399401494:web:3c24b2e33d26c65b9d3337",
    measurementId: "G-YJ17F3FN8V"
  }; 

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };
