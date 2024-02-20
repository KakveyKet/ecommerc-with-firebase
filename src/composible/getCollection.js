import { ref, onUnmounted } from "vue";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { projectFirestore } from "@/firebase/config";

const getCollections = (collectionName, date) => {
    const error = ref(null);
    const documents = ref([]);
    const isPending = ref(true);

    // Define the base query
    let baseQuery = collection(projectFirestore, collectionName);

    // If date is provided, apply date filters
    if (date) {
        baseQuery = query(baseQuery, orderBy("created_at", "desc"), where("created_at", ">=", date.from), where("created_at", "<=", date.to));
    } else {
        baseQuery = query(baseQuery, orderBy("created_at", "desc"));
    }

    const unsubscribe = onSnapshot(
        baseQuery,
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

    // Unsubscribe when component unmounts
    onUnmounted(() => {
        unsubscribe();
    });

    return { error, isPending, documents };
};

export default getCollections;
