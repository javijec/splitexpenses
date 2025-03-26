import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
    this.initAuthStateListener();
    this.startSessionTimer();
  }

  // Initialize auth state listener
  initAuthStateListener() {
    this.authRepository.onAuthStateChanged(async (user) => {
      if (user) {
        // You could save or update user here if needed
      } else {
        console.error("User is signed out");
      }
    });
  }

  // Start a timer to refresh the session token every 30 minutes
  startSessionTimer() {
    setInterval(async () => {
      const user = this.authRepository.getCurrentUser();
      if (user) {
        try {
          await user.getIdToken(true); // Force refresh the token
        } catch (error) {
          console.error("Error refreshing session token:", error);
        }
      }
    }, 30 * 60 * 1000); // 30 minutes in milliseconds
  }

  async login() {
    try {
      const user = await this.authRepository.login();
      await this.saveUserToFirestore(user);
      return user;
    } catch (error) {
      console.error("AuthService: Login error:", error);
      throw error;
    }
  }

  async saveUserToFirestore(user) {
    try {
      const existingUser = await this.userRepository.getUser(user.uid);

      if (!existingUser) {
        const userData = {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerData: user.providerData,
          createdAt: new Date().toISOString(),
        };

        await this.userRepository.createUser(userData);
      }
    } catch (error) {
      return false;
    }
  }

  async logout() {
    return this.authRepository.logout();
  }

  async deleteAccount() {
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

  // Add a general error handler
  handleError(error, operation = "operation") {
    console.error(`AuthService: Error during ${operation}:`, error);
    // Log the error but don't throw it unless necessary
    // This prevents errors from causing authentication state changes
    return {
      success: false,
      error: error.message || `An error occurred during ${operation}`,
    };
  }
}
