
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDd394RIoHuonslH2Fy1aMz0ToblvOauoY",
  authDomain: "interviewprepai-26a70.firebaseapp.com",
  projectId: "interviewprepai-26a70",
  storageBucket: "interviewprepai-26a70.firebasestorage.app",
  messagingSenderId: "679654201913",
  appId: "1:679654201913:web:d0356b6a5830629b814be8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}

