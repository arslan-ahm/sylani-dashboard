import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Custom hook to get the count of documents in a Firestore collection
 * @param {string} collectionName - Name of the collection
 * @param {Array} conditions - Optional query conditions [{field, operator, value}]
 */
export const useCollectionCount = (collectionName, conditions = []) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
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
        setCount(querySnapshot.size);
      } catch (error) {
        console.error(`Error fetching count for ${collectionName}:`, error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    if (collectionName) {
      fetchCount();
    }
  }, [collectionName, JSON.stringify(conditions)]);

  return { count, loading };
};
