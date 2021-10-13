import { useState, useEffect } from "react";
import { projectFireStore } from "../firebase/config";
import { query, onSnapshot, orderBy, collection } from "firebase/firestore";

const useFirestore = (collect) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(projectFireStore, collect),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
    return () => unsubscribe();
  }, [collect]);

  return { docs };
};

export default useFirestore;
