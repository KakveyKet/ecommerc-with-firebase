import { doc, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { ref } from 'vue';

const useDocument = (collectionName, id, subcollection) => {
    const error = ref(null);
    const isPending = ref(false);
    let documentRef;

    const addDoc = async (data) => {
        try {
            console.log('Adding document with data:', data);

            const collectionRef = collection(projectFirestore, collectionName, id, subcollection);
            documentRef = doc(collectionRef);
            isPending.value = true;
            const res = await setDoc(documentRef, data);
            console.log('Document successfully added:', res);
            return res;
        } catch (err) {
            console.error('Error adding document:', err);
            error.value = err.message;
        } finally {
            isPending.value = false;
        }
    };

    const updateDocs = async (docId, updates) => {
        try {
            const subcollectionRef = collection(projectFirestore, collectionName, id, subcollection);
            documentRef = doc(subcollectionRef, docId);
            error.value = null;
            isPending.value = true;

            await updateDoc(documentRef, updates);

            console.log('Document successfully updated');
            return { success: true };
        } catch (err) {
            console.error('Error updating document:', err);
            error.value = err.message;
            return { success: false, error: err.message };
        } finally {
            isPending.value = false;
        }
    };

    const deleteDocs = async (docId) => {
        try {
            const subcollectionRef = collection(projectFirestore, collectionName, id, subcollection);
            documentRef = doc(subcollectionRef, docId);

            error.value = null;
            isPending.value = true;

            await deleteDoc(documentRef);

            console.log('Document successfully deleted');
            return { success: true };
        } catch (err) {
            console.error('Error deleting document:', err);
            error.value = err.message;
            return { success: false, error: err.message };
        } finally {
            isPending.value = false;
        }
    };

    return { addDoc, updateDocs, deleteDocs, error, isPending };
};

export default useDocument;
