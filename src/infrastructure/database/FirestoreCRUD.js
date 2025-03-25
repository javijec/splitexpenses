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
import { handleError } from "@/utils/errorHandler";

class FirestoreCRUD {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async createDocument(data) {
    try {
      console.log("Data:", data);
      // Check if data.id exists, if not, use a generated ID
      const docRef = data.id
        ? doc(this.collectionRef, data.id)
        : doc(this.collectionRef);
      console.log("Document Reference:", docRef);

      // If we're using a generated ID, add it to the data object
      const documentData = data.id ? data : { ...data, id: docRef.id };

      await setDoc(docRef, documentData);
      console.log("Document written with ID: ", docRef.id);
      return { success: true, data: docRef.id };
    } catch (error) {
      return handleError(error, "FirestoreCRUD.createDocument");
    }
  }

  async readDocuments() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, data: documents };
    } catch (error) {
      return handleError(error, "FirestoreCRUD.readDocuments");
    }
  }

  async updateDocument(id, updatedData) {
    try {
      const docRef = doc(this.collectionRef, id);
      await updateDoc(docRef, updatedData);
      return { success: true, message: "Document updated successfully" };
    } catch (error) {
      return handleError(error, "FirestoreCRUD.updateDocument");
    }
  }

  async deleteDocument(id) {
    try {
      console.log("Deleting document with ID:", id);
      const docRef = doc(this.collectionRef, id);
      console.log("Document Reference:", docRef);
      await deleteDoc(docRef);
      return { success: true, message: "Document deleted successfully" };
    } catch (error) {
      return handleError(error, "FirestoreCRUD.deleteDocument");
    }
  }

  // Add this method to the FirestoreCRUD class if it doesn't exist
  async readDocument(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...docSnap.data(),
          },
        };
      } else {
        return false;
      }
    } catch (error) {
      return handleError(error, "FirestoreCRUD.readDocument");
    }
  }
}

export default FirestoreCRUD;
