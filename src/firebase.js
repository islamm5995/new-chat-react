// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAfluqGWP8duMoqB5jj16x7XuRebDbS3AQ",
    authDomain: "fir-chat-app-a04fd.firebaseapp.com",
    databaseURL: "https://fir-chat-app-a04fd-default-rtdb.firebaseio.com",
    projectId: "fir-chat-app-a04fd",
    storageBucket: "fir-chat-app-a04fd.appspot.com",
    messagingSenderId: "472176407345",
    appId: "1:472176407345:web:31756948fd0ac9aea1b610",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, provider, database };


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAfluqGWP8duMoqB5jj16x7XuRebDbS3AQ",
//   authDomain: "fir-chat-app-a04fd.firebaseapp.com",
//   databaseURL: "https://fir-chat-app-a04fd-default-rtdb.firebaseio.com",
//   projectId: "fir-chat-app-a04fd",
//   storageBucket: "fir-chat-app-a04fd.appspot.com",
//   messagingSenderId: "472176407345",
//   appId: "1:472176407345:web:31756948fd0ac9aea1b610",
//   measurementId: "G-9H9B501FVW"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);