import { signInWithGoogle } from "@/infrastructure/services/firebaseAuthService";

export async function signIn(provider) {
  try {
    let user;
    if (provider.id === "google") {
      user = await signInWithGoogle(); // Use a method that doesn't open a new window
    }
    return { user };
  } catch (error) {
    console.error("Error signing in:", error);
    return { error: error.message };
  }
}