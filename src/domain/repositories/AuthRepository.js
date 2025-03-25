import { auth } from "@/infrastructure/config/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser as firebaseDeleteUser,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";

export class AuthRepository {
  constructor() {
    this.auth = auth;
  }

  async login() {
    console.log("AuthRepository login");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error("AuthRepository: Error in popup login:", error);
      throw error;
    }
  }

  async logout() {
    return signOut(this.auth);
  }

  async deleteAccount() {
    return firebaseDeleteUser(this.auth.currentUser);
  }

  onAuthStateChanged(callback) {
    return firebaseOnAuthStateChanged(this.auth, callback);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
