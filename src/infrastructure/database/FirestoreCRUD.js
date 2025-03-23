import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
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
      const docRef = await addDoc(this.collectionRef, data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
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
}

export default FirestoreCRUD;
