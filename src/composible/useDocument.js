import { projectFirestore } from "@/firebase/config";
import { doc, setDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { ref } from "vue";

const useDocument = (collectionName, id, subcollection) => {
    const error = ref(null);
    const isPending = ref(false);
    let documentRef;
    const addDoc = async (name, data) => {
        console.log("Name parameter:", name);
        documentRef = doc(projectFirestore, collectionName, id, subcollection, name);
        error.value = null;
        isPending.value = true;

        try {
            const res = await setDoc(documentRef, data);
            console.log("Document successfully added:", res);
            isPending.value = false;
            return res;
        } catch (err) {
            console.error("Error adding document:", err);
            error.value = err.message;
            isPending.value = false;
        }
    };



    const updateDoc = async (docId, updates) => {
        documentRef = doc(projectFirestore, collectionName, id, subcollection, docId);
        error.value = null;
        isPending.value = true;

        try {
            await updateDoc(documentRef, updates);
            return { success: true }; // Indicate success
        } catch (err) {
            error.value = err.message;
            return { success: false, error: err.message }; // Indicate failure with error message
        } finally {
            isPending.value = false;
        }
    };

    const deleteDoc = async (docId) => {
        documentRef = doc(projectFirestore, collectionName, id, subcollection, docId);
        error.value = null;
        isPending.value = true;

        try {
            await deleteDoc(documentRef);
            return { success: true }; // Indicate success
        } catch (err) {
            error.value = err.message;
            return { success: false, error: err.message }; // Indicate failure with error message
        } finally {
            isPending.value = false;
        }
    };

    return { addDoc, updateDoc, deleteDoc, error, isPending };
};

export default useDocument;
