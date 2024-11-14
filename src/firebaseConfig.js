// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore import 추가
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDzDUbMghbmEZkIox1N7H2UdKWWupw4VRA",
	authDomain: "blog-fc57c.firebaseapp.com",
	projectId: "blog-fc57c",
	storageBucket: "blog-fc57c.firebasestorage.app",
	messagingSenderId: "56321445097",
	appId: "1:56321445097:web:c87efa45f00f6d0053b478",
	measurementId: "G-KVRX9FBNDC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 초기화

// Firestore를 export
export { db };
