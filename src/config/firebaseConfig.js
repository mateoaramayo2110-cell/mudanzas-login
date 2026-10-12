import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clean = (val) => (val ? String(val).trim().replace(/^["']|["',]+$/g, '').trim() : '');

const firebaseConfig = {
  apiKey: clean(process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
  authDomain: clean(process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: clean(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: clean(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: clean(process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let auth = null;
if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  try {
    auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch (error) {
    if (error.code !== 'auth/already-initialized') throw error;
    auth = getAuth(app);
  }
}

export { auth };
