import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { Timestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWJ-xvkmtAInAOsbAIH9QlBgA3bKzirIs",
    authDomain: "ecommerce-b0d69.firebaseapp.com",
    projectId: "ecommerce-b0d69",
    storageBucket: "ecommerce-b0d69.appspot.com",
    messagingSenderId: "482881614670",
    appId: "1:482881614670:web:a4369a21f28900e2ca241f"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const projectAuth = getAuth(firebaseApp);
const projectFirestore = getFirestore(firebaseApp);
const projectStorage = getStorage(firebaseApp);
const timestamp = serverTimestamp;

// Initialize Firebase Functions
const functions = getFunctions(firebaseApp);

// Define function to convert Date to Timestamp
const convertToTimestamp = Timestamp.fromDate;
// Export initialized Firebase services and function
export { firebaseApp, projectAuth, projectFirestore, projectStorage, timestamp, functions, convertToTimestamp };
