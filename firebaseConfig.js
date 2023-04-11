import { initializeApp } from 'firebase/app';
import firestore from "firebase/firestore";
const userDocument = firestore().collection('Users').doc('ABC');

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import firestore from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfmW98iWLhhNtFrjy-3niS_OWPhrQTb5U",
  authDomain: "robowatch-4c113.firebaseapp.com",
  projectId: "robowatch-4c113",
  storageBucket: "robowatch-4c113.appspot.com",
  messagingSenderId: "416751963314",
  appId: "1:416751963314:web:eaae18d08b2da367298dab",
  measurementId: "G-HNHKV87TTL"
};

const app = initializeApp(firebaseConfig);
