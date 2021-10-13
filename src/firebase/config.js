import { initializeApp } from "firebase/app";
// use for store photos
import { getStorage } from "firebase/storage";
// use for database
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage();
const projectFireStore = getFirestore(app);

export { projectStorage, projectFireStore };
