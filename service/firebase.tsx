// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBh7T71FIBdzYFzcB_ghXmFdMwp0BvpUc',
  authDomain: 'pitech-3e85d.firebaseapp.com',
  projectId: 'pitech-3e85d',
  storageBucket: 'pitech-3e85d.appspot.com',
  messagingSenderId: '191696229230',
  appId: '1:191696229230:web:9e24d486deb00723b4e77f',
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const storage = getFirestore(fireApp);
export default storage;
