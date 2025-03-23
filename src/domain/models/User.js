class User {
  constructor(uid, displayName, email, photoURL, providerData, createdAt) {
    this.uid = uid; // ID from Firebase
    this.displayName = displayName; // Display name of the user
    this.email = email; // Email address of the user
    this.photoURL = photoURL; // URL of the user's photo
    this.providerData = providerData; // Provider data (e.g., Google)
    this.createdAt = createdAt; // Timestamp of when the user was created
  }
}

export default User;