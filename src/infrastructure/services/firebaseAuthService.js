import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/infrastructure/config/firebaseConfig";

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to handle the result after redirect
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      return result.user;
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};
