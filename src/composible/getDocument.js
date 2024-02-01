import { projectFirestore } from "@/firebase/config";
import { collection, getDocs, doc } from "@firebase/firestore";
import { ref, watchEffect } from "vue";

const getDocument = (collectionName, id, subcollection) => {
    const error = ref(null);
    const documents = ref(null);

    const subcollectionRef = collection(projectFirestore, collectionName, id, subcollection);

    const unsubscribe = watchEffect((onInvalidate) => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(subcollectionRef);
                const result = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                documents.value = result;
                error.value = null;
            } catch (err) {
                error.value = err.message;
                documents.value = null;
            }
        };

        fetchData();

        onInvalidate(() => {
            unsubscribe();
        });
    });

    return {
        error,
        documents,
    };
};

export default getDocument;
