import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCzLXR4wXCdMbHKS6DtPDP28YpIsdCnesI",
    authDomain: "chatlive-8d55c.firebaseapp.com",
    databaseURL: "https://chatlive-8d55c-default-rtdb.firebaseio.com",
    projectId: "chatlive-8d55c",
    storageBucket: "chatlive-8d55c.firebasestorage.app",
    messagingSenderId: "72912336053",
    appId: "1:72912336053:web:295349deae93cc5d7e3afc",
    measurementId: "G-K19KDZG2BJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);