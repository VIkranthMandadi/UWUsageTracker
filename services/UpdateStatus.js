import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "./Firebase/firebase.js";

/**
 * Updates the status of a court in the Firestore database.
 * @param {string} courtName - The name of the court to update (document ID).
 * @param {string} newStatus - The new status to set for the court.
 * @returns {Promise<void>} - A promise that resolves when the update is successful.
 */
export const updateStatus = async (courtName, newStatus) => {
  try {
    // Reference to the specific court document
    const courtRef = doc(db, "courts", courtName);

    // Update the status field in the court document
    await updateDoc(courtRef, {
      status: newStatus,
    });

    console.log(`Successfully updated status of ${courtName} to ${newStatus}`);
  } catch (error) {
    console.error("Error updating court status:", error);
    throw new Error("Failed to update court status.");
  }
};
