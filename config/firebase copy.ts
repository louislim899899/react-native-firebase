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
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

// Validate Firebase config is set up
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn(
    'Firebase config is incomplete. Please set EXPO_PUBLIC_FIREBASE_* environment variables or update app.json. See FIREBASE_SETUP.md for instructions.'
  );
}

// Initialize Firebase immediately (not lazily)
// This ensures Firebase components are properly registered
const apps = getApps();
const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);

// Initialize and export Auth and Firestore instances
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// Also provide function-based access for compatibility
export function getFirebaseAuth(): Auth {
  return auth;
}

export function getFirebaseDb(): Firestore {
  return db;
}