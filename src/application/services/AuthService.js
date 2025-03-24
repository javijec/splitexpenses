import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
    this.initAuthStateListener();
  }

  // Initialize auth state listener
  initAuthStateListener() {
    this.authRepository.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User is signed in:", user.displayName);
        // You could save or update user here if needed
      } else {
        console.log("User is signed out");
      }
    });
  }

  async login() {
    console.log("AuthService: Starting Google login with popup...");
    try {
      const user = await this.authRepository.login();
      console.log("AuthService: User authenticated:", user.displayName);
      await this.saveUserToFirestore(user);
      return user;
    } catch (error) {
      console.error("AuthService: Login error:", error);
      throw error;
    }
  }

  async saveUserToFirestore(user) {
    try {
      console.log("AuthService: Checking if user exists in Firestore...");
      // Check if user already exists in Firestore
      const existingUser = await this.userRepository.getUser(user.uid);

      if (!existingUser) {
        console.log("AuthService: Creating new user in Firestore...");
        // Create new user document if it doesn't exist
        const userData = {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerData: user.providerData,
          createdAt: new Date().toISOString(),
        };

        await this.userRepository.createUser(userData);
        console.log("AuthService: User saved to Firestore:", user.uid);
      } else {
        console.log("AuthService: User already exists in Firestore:", user.uid);
      }
    } catch (error) {
      console.error("AuthService: Error saving user to Firestore:", error);
      // Ensure error handling does not affect authentication session
      throw error;
    }
  }

  async logout() {
    console.log("AuthService: Logging out...");
    return this.authRepository.logout();
  }

  async deleteAccount() {
    console.log("AuthService: Deleting account...");
    const user = this.authRepository.getCurrentUser();
    if (user) {
      // Delete user from Firestore first
      await this.userRepository.deleteUser(user.uid);
      // Then delete the authentication account
      return this.authRepository.deleteAccount();
    }
    throw new Error("No user is currently signed in");
  }

  onAuthStateChanged(callback) {
    return this.authRepository.onAuthStateChanged(callback);
  }

  getCurrentUser() {
    return this.authRepository.getCurrentUser();
  }
}
