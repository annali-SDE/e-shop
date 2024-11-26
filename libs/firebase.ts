// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA7Fn0_iO44ktc2VIwiFtwiwv5azKrBm1w',
	authDomain: 'e-shop-45ccd.firebaseapp.com',
	projectId: 'e-shop-45ccd',
	storageBucket: 'e-shop-45ccd.firebasestorage.app',
	messagingSenderId: '71389903131',
	appId: '1:71389903131:web:71bc61df7b8aa6c0edbbbe'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
