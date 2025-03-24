class User {
  constructor(uid, displayName, email, photoURL, createdAt) {
    this.id = uid; // ID from Firebase (used as document ID)
    this.displayName = displayName; // Display name of the user
    this.email = email; // Email address of the user
    this.photoURL = photoURL; // URL of the user's photo
    this.createdAt = createdAt || new Date().toISOString(); // Timestamp of when the user was created
  }
}

export default User;
