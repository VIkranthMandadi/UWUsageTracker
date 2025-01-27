import { doc, collection, updateDoc, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase.js";

/**
 * Updates the status of a court in the Firestore database.
 * @param {string} collectionName - The name of the collection (e.g., "Nic" or "Bakke").
 * @param {string} courtName - The name of the court to update (document ID).
 * @param {string} newStatus - The new status to set for the court.
 * @returns {Promise<void>} - A promise that resolves when the update is successful.
 */
export const updateStatus = async (collectionName, courtName, newStatus) => {
  try {
    // Reference to the specific court document in the specified collection
    const courtRef = doc(db, collectionName, courtName);

    // Update the status field in the court document
    await updateDoc(courtRef, {
      status: newStatus,
    });

    console.log(
      `Successfully updated status of ${courtName} in ${collectionName} to ${newStatus}`
    );
  } catch (error) {
    console.error(`Error updating court status in ${collectionName}:`, error);
    throw new Error("Failed to update court status.");
  }
};

/**
 * Fetches the statuses of all courts from a specified Firestore collection.
 * @param {string} collectionName - The name of the collection to fetch statuses from (e.g., "Nic" or "Bakke").
 * @returns {Promise<{ [key: string]: string }>} - A promise that resolves with an object containing court names as keys and their statuses as values.
 */
export const fetchStatuses = async (collectionName) => {
  try {
    const courtsCollection = collection(db, collectionName); // Reference to the specified collection
    const snapshot = await getDocs(courtsCollection);

    const statuses = {};
    snapshot.forEach((doc) => {
      statuses[doc.id] = doc.data().status; // Map each document ID to its status field
    });

    console.log(`Fetched statuses from ${collectionName}:`, statuses);
    return statuses;
  } catch (error) {
    console.error(
      `Error fetching court statuses from ${collectionName}:`,
      error
    );
    throw new Error("Failed to fetch court statuses.");
  }
};