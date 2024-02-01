import { ref, onUnmounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { projectFirestore } from "@/firebase/config";

const getCollections = (collectionName) => {
    const error = ref(null);
    const documents = ref([]);
    const isPending = ref(true);
    const collectionRef = collection(projectFirestore, collectionName);
    const unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
            const result = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            documents.value = result;
            error.value = null;
            isPending.value = false;
        },
        (err) => {
            documents.value = [];
            isPending.value = false;
            error.value = err.message;
        }
    );

    onUnmounted(() => {
        unsubscribe();
    });

    return { error, isPending, documents };
};

export default getCollections;
