import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2VYOxW2fvH5Y5L2Bl5gA-_Tv1Hm7gG60",
  authDomain: "expo-54915.firebaseapp.com",
  projectId: "expo-54915",
  storageBucket: "expo-54915.appspot.com",
  messagingSenderId: "1064406560723",
  appId: "1:1064406560723:web:11d39134f95410a4b00926",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
