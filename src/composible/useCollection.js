// useCollection.js
import { ref, onMounted } from "vue";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collectionName) => {
    const error = ref(null);
    const isPending = ref(false);

    onMounted(() => {
        console.log("useCollection composible is mounted");
    });

    const addUser = async (userInfo) => {
        error.value = null;
        try {
            const result = await addDoc(collection(projectFirestore, collectionName), userInfo);
            return result;
        } catch (err) {
            error.value = { code: err.code, message: err.message };
        }
    };

    const addDocument = async (category) => {
        error.value = null;
        isPending.value = true;

        try {
            await addDoc(collection(projectFirestore, collectionName), category);
            isPending.value = false;
        } catch (err) {
            error.value = { code: err.code, message: err.message };
            isPending.value = false;
        }
    };

    const removeDocument = async (docID) => {
        const documentRef = doc(projectFirestore, collectionName, docID);
        error.value = null;
        try {
            await deleteDoc(documentRef);
        } catch (err) {
            error.value = { code: err.code, message: err.message };
        }
    };

    return { error, addUser, addDocument, isPending, removeDocument };
};

export default useCollection;
