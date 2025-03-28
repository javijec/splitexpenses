import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Determinar si estamos en entorno de desarrollo
const isDevelopment =
  import.meta.env.MODE === "development" || import.meta.env.DEV === true;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Conectar a los emuladores solo en entorno de desarrollo
if (isDevelopment) {
  console.log("🔥 Usando emuladores de Firebase (desarrollo)");
  // Connect to Firestore emulator
  connectFirestoreEmulator(db, "localhost", 8080);
  // Connect to Auth emulator
  connectAuthEmulator(auth, "http://localhost:9099");
} else {
  console.log("🔥 Usando Firebase en producción");
}
