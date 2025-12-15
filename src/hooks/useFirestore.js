import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

/**
 * Custom hook for Firestore operations
 * @param {string} collectionName - Name of the Firestore collection
 */
export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all documents from collection
  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setData(items);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err.message);
      toast.error(`Failed to fetch ${collectionName}`);
    } finally {
      setLoading(false);
    }
  };

  // Add a new document
  const addDocument = async (docData) => {
    try {
      const docId = docData.id || new Date().getTime().toString();
      await setDoc(doc(db, collectionName, docId), {
        ...docData,
        id: docId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast.success('Data added successfully');
      await fetchData();
      return { success: true, id: docId };
    } catch (err) {
      console.error(`Error adding document to ${collectionName}:`, err);
      toast.error('Failed to add data');
      return { success: false, error: err.message };
    }
  };

  // Update an existing document
  const updateDocument = async (docId, updates) => {
    try {
      await updateDoc(doc(db, collectionName, docId), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      toast.success('Data updated successfully');
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error(`Error updating document in ${collectionName}:`, err);
      toast.error('Failed to update data');
      return { success: false, error: err.message };
    }
  };

  // Delete a document
  const deleteDocument = async (docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      toast.success('Data deleted successfully');
      setData(data.filter((item) => item.id !== docId));
      return { success: true };
    } catch (err) {
      console.error(`Error deleting document from ${collectionName}:`, err);
      toast.error('Failed to delete data');
      return { success: false, error: err.message };
    }
  };

  // Query documents with conditions
  const queryDocuments = async (conditions = []) => {
    try {
      setLoading(true);
      let q = collection(db, collectionName);
      
      if (conditions.length > 0) {
        const constraints = conditions.map(({ field, operator, value }) =>
          where(field, operator, value)
        );
        q = query(q, ...constraints);
      }

      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      
      return items;
    } catch (err) {
      console.error(`Error querying ${collectionName}:`, err);
      toast.error(`Failed to query ${collectionName}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  return {
    data,
    loading,
    error,
    fetchData,
    addDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
  };
};
