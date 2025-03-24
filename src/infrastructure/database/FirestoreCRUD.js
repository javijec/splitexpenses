import { db } from "../config/firebaseConfig";
import {
  collection,
  setDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

class FirestoreCRUD {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async createDocument(data) {
    try {
      const docRef = doc(this.collectionRef, data.id);
      await setDoc(docRef, data);
      console.log("Document written with ID: ", data.id);
      return data.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }

  async readDocuments() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Documents: ", documents);
      return documents;
    } catch (e) {
      console.error("Error reading documents: ", e);
      throw e;
    }
  }

  async updateDocument(id, updatedData) {
    try {
      const docRef = doc(this.collectionRef, id);
      await updateDoc(docRef, updatedData);
      console.log("Document updated");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }

  async deleteDocument(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      console.log("Document deleted");
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }

  // Add this method to the FirestoreCRUD class if it doesn't exist
  async readDocument(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        console.log("No such document with ID:", id);
        return null;
      }
    } catch (e) {
      console.error("Error reading document:", e);
      throw e;
    }
  }
}

export default FirestoreCRUD;
