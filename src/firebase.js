import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6Z1NDmnjoApZ13a5g62uTWr_SOnOVBds",
  authDomain: "connect-pro-new.firebaseapp.com",
  projectId: "connect-pro-new",
  storageBucket: "connect-pro-new.appspot.com",
  messagingSenderId: "237057484022",
  appId: "1:237057484022:web:e48322a19bc6e92f49b8d7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const firestore = getFirestore(firebaseApp)

export { auth ,firebaseApp,db};
