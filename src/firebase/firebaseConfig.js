// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBjcZQZRje2JqN9F4WW_mF466-nOPkeB6s',
    authDomain: 'daily-news-a8a69.firebaseapp.com',
    projectId: 'daily-news-a8a69',
    storageBucket: 'daily-news-a8a69.firebasestorage.app',
    messagingSenderId: '871874671509',
    appId: '1:871874671509:web:bd842fbbde1c7658e57c9c',
    measurementId: 'G-HRX2SZ552P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
