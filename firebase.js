import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAUQT1xUfIriO2n_4OVR3Ws4LIkcJGYNZE",
    authDomain: "chat-app-clone-shub78910.firebaseapp.com",
    projectId: "chat-app-clone-shub78910",
    storageBucket: "chat-app-clone-shub78910.appspot.com",
    messagingSenderId: "251008041404",
    appId: "1:251008041404:web:1ed635ded4f76230336bb9",
    measurementId: "G-DZMQ9N5721"
  });

const db = firebaseApp.firestore();


const storage = firebase.storage();

export { storage };

export default db;