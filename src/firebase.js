// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCgSN_h3mK4i3vs9HcYY5LG0pmMvzL4DtI",
    authDomain: "expensetracker-2eea5.firebaseapp.com",
    projectId: "expensetracker-2eea5",
    storageBucket: "expensetracker-2eea5.appspot.com",
    messagingSenderId: "116229044858",
    appId: "1:116229044858:web:0818bb6894a3981c3bd9c3",
    measurementId: "G-YB7RRQV4EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const c = collection(db, "expenses")
//const q = query(collection(db, "expenses"))

//const analytics = getAnalytics(app);

export default db;
