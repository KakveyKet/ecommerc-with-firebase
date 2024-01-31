import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWJ-xvkmtAInAOsbAIH9QlBgA3bKzirIs",
    authDomain: "ecommerce-b0d69.firebaseapp.com",
    projectId: "ecommerce-b0d69",
    storageBucket: "ecommerce-b0d69.appspot.com",
    messagingSenderId: "482881614670",
    appId: "1:482881614670:web:a4369a21f28900e2ca241f"
};

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(firebaseApp);
const projectAuth = getAuth(firebaseApp);
const projectStorage = getStorage(firebaseApp);
const timestamp = serverTimestamp;
export { projectAuth, projectFirestore, projectStorage, timestamp };
