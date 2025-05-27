import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { db } from './firebaseConfig.js';


async function saveUserData(phone, password) {
  try {
    const userRef = doc(db, "users", phone);
    await setDoc(userRef, {
      phone,
      password // ⚠️ Store hashed passwords in production
    });
    alert("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
    alert("Failed to save user data.");
  }
}

export { saveUserData };