import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Replace with your Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCamaUC2zNZr1Z6Cu-6vlV0K5WZ5LWYul0",
    authDomain: "tourist-akshat-react-js.firebaseapp.com",
    projectId: "tourist-akshat-react-js",
    storageBucket: "tourist-akshat-react-js.firebasestorage.app",
    messagingSenderId: "373127180515",
    appId: "1:373127180515:web:7549486dab806f2b68d5d6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc };
