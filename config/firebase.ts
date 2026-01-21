import { getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

/**
 * Firebase Configuration
 *
 * Initialize Firebase with project credentials.
 * For Expo projects, credentials are read from environment variables:
 * EXPO_PUBLIC_FIREBASE_*
 *
 * To configure:
 * 1. Create a .env file with your Firebase credentials
 * 2. Or update app.json extra section
 *
 * @see FIREBASE_SETUP.md for setup instructions
 */

const firebaseConfig = {
  apiKey: "AIzaSyChplvvHRF6WSnO7bZ_DnUcwDAFMv7T_4E",
  authDomain: "newproject-292ce.firebaseapp.com",
  projectId: "newproject-292ce",
  storageBucket: "newproject-292ce.firebasestorage.app",
  messagingSenderId: "197310582688",
  appId: "1:197310582688:web:e2a99cbdd0b1276643dec5",
  measurementId: "G-GJPYRZNBTC"
};

// Validate Firebase config is set up
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn(
    'Firebase config is incomplete. Please set EXPO_PUBLIC_FIREBASE_* environment variables or update app.json. See FIREBASE_SETUP.md for instructions.'
  );
}

// Initialize Firebase app
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize and export Auth and Firestore instances directly
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// Also provide function-based access for compatibility
export function getFirebaseAuth(): Auth {
  return auth;
}

export function getFirebaseDb(): Firestore {
  return db;
}