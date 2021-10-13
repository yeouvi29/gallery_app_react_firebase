import { useState, useEffect } from "react";
import {
  projectFireStore,
  projectStorage,
  timestamp,
} from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, file.name);

    // uploadBytes(storageRef, file);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // console.log("File available at", downloadURL);
        setUrl(downloadURL);
        try {
          const docRef = await addDoc(collection(projectFireStore, "images"), {
            url: downloadURL,
            createdAt: Timestamp.now(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
