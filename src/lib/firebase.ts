import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBrMyp3rYdNUX1gouOT8MiwWKVveb1rc-8",
  authDomain: "docgen-4d54b.firebaseapp.com",
  projectId: "docgen-4d54b",
  storageBucket: "docgen-4d54b.firebasestorage.app",
  messagingSenderId: "760842985034",
  appId: "1:760842985034:web:600ceb940e3f1dd7f050b3",
  measurementId: "G-RBY47Q4LF4",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);

// Analytics only runs in the browser
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) getAnalytics(app);
  });
}

export default app;
