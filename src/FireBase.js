// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqjnKzOe9G5sUDXU-_SaI6nL4s4j8utqM",
  authDomain: "weatherapi-fa118.firebaseapp.com",
  projectId: "weatherapi-fa118",
  storageBucket: "weatherapi-fa118.appspot.com",
  messagingSenderId: "474539692390",
  appId: "1:474539692390:web:9e563a9fb9b69edcedb8a7",
  measurementId: "G-2EM86BW40B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
