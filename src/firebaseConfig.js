import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDzDUbMghbmEZkIox1N7H2UdKWWupw4VRA",
	authDomain: "blog-fc57c.firebaseapp.com",
	projectId: "blog-fc57c",
	storageBucket: "blog-fc57c.appspot.com",
	messagingSenderId: "56321445097",
	appId: "1:56321445097:web:c87efa45f00f6d0053b478",
	measurementId: "G-KVRX9FBNDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
