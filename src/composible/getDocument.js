import { collection, getDocs } from '@firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { ref, watchEffect } from 'vue';

const getDocument = (collectionName, id, subcollection) => {
    const error = ref(null);
    const documents = ref([]);

    const subcollectionRef = collection(projectFirestore, collectionName, id, subcollection);

    const fetchData = async () => {
        try {
            const snapshot = await getDocs(subcollectionRef);
            const result = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            documents.value = result;
            error.value = null;
        } catch (err) {
            error.value = err.message;
            documents.value = [];
        }
    };

    const unsubscribe = watchEffect((onInvalidate) => {
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
