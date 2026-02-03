import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using environment variables for security
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Robust initialization to prevent app crash if config is missing
let app;
const isConfigured = !!firebaseConfig.apiKey;

try {
    if (isConfigured) {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    } else {
        console.warn("Firebase configuration is missing. Authentication and feedback features will be disabled. Please check your .env file.");
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

// Export services (with null checks handled in contexts/hooks)
export const auth = isConfigured && app ? getAuth(app) : null;
export const db = isConfigured && app ? getFirestore(app) : null;
export default app;
