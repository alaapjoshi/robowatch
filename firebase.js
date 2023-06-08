import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfmW98iWLhhNtFrjy-3niS_OWPhrQTb5U",
  authDomain: "robowatch-4c113.firebaseapp.com",
  projectId: "robowatch-4c113",
  storageBucket: "robowatch-4c113.appspot.com",
  messagingSenderId: "416751963314",
  appId: "1:416751963314:web:eaae18d08b2da367298dab",
  measurementId: "G-HNHKV87TTL"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();