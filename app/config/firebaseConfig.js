import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../constants/constants";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: constants.api_key,
  authDomain: constants.auth_domain,
  projectId: constants.project_id,
  storageBucket: constants.storage_backet,
  messagingSenderId: constants.message_sender_id,
  appId: constants.app_id,
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
