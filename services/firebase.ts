import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJJMKbGfyCZ0z8Dc9nbD-diA_W1k2t598",
  authDomain: "twinmindapp-9a3f9.firebaseapp.com",
  projectId: "twinmindapp-9a3f9",
  storageBucket: "twinmindapp-9a3f9.appspot.com",
  messagingSenderId: "696472463958",
  appId: "1:696472463958:web:6b43e92e6274e6923ea9f7",
  measurementId: "G-3XYDTN1BET"
};

const app = initializeApp(firebaseConfig);

// Persistent auth for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
