import { db } from "../infrastructure/config/firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Test collection name
const TEST_COLLECTION = "test_collection";

// Test document data
const testData = {
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date().toISOString(),
};

// Function to run all tests
async function runFirestoreTests() {
  console.log("🔥 Starting Firestore tests...");

  try {
    // Test 1: Write operation
    console.log("\n📝 Test 1: Writing document to Firestore...");
    const docRef = await addDoc(collection(db, TEST_COLLECTION), testData);
    console.log("✅ Document written with ID:", docRef.id);

    // Test 2: Read all documents
    console.log("\n📚 Test 2: Reading all documents...");
    const querySnapshot = await getDocs(collection(db, TEST_COLLECTION));
    console.log(`✅ Found ${querySnapshot.docs.length} documents:`);
    querySnapshot.forEach((doc) => {
      console.log(`- Document ID: ${doc.id}, Data:`, doc.data());
    });

    // Test 3: Read specific document
    console.log("\n📄 Test 3: Reading specific document...");
    const docSnap = await getDoc(doc(db, TEST_COLLECTION, docRef.id));
    if (docSnap.exists()) {
      console.log("✅ Document data:", docSnap.data());
    } else {
      console.log("❌ Document not found!");
    }

    // Test 4: Update document
    console.log("\n🔄 Test 4: Updating document...");
    await updateDoc(doc(db, TEST_COLLECTION, docRef.id), {
      name: "Updated Test User",
      updatedAt: new Date().toISOString(),
    });
    console.log("✅ Document updated");

    // Verify update
    const updatedDocSnap = await getDoc(doc(db, TEST_COLLECTION, docRef.id));
    console.log("Updated document data:", updatedDocSnap.data());

    // Test 5: Delete document
    console.log("\n🗑️ Test 5: Deleting document...");
    await deleteDoc(doc(db, TEST_COLLECTION, docRef.id));
    console.log("✅ Document deleted");

    // Verify deletion
    const deletedDocSnap = await getDoc(doc(db, TEST_COLLECTION, docRef.id));
    console.log("Document exists after deletion:", deletedDocSnap.exists());

    console.log("\n🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed with error:", error);
  }
}

// Run the tests
runFirestoreTests();

export default runFirestoreTests;
