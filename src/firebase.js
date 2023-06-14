// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBs7HFxYokQR9RkdutEF8BiziKS7Qb6kb8",
    authDomain: "expense-chart-f7e88.firebaseapp.com",
    projectId: "expense-chart-f7e88",
    storageBucket: "expense-chart-f7e88.appspot.com",
    messagingSenderId: "898817549479",
    appId: "1:898817549479:web:7991c8b81f87a520bbe782",
    measurementId: "G-ZCVK9K5Z0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const c = collection(db, "expenses")
//const q = query(collection(db, "expenses"))

//const analytics = getAnalytics(app);

export default db;
