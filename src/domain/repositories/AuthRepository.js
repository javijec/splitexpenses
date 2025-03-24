import { auth } from "@/infrastructure/config/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile as firebaseUpdateProfile,
  deleteUser,
  onAuthStateChanged as firebaseOnAuthStateChanged,
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
      console.log("AuthRepository: Popup login result:", result.user);
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
    return deleteUser(this.auth.currentUser);
  }

  async updateProfile(user, profileUpdates) {
    return firebaseUpdateProfile(user, profileUpdates);
  }

  onAuthStateChanged(callback) {
    return firebaseOnAuthStateChanged(this.auth, callback);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
