import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";
import getUser from "./getUser";
import { doc, onSnapshot } from "firebase/firestore";

const getUserDoc = (collectionPath) => {
    const { user } = getUser("users");
    const error = ref(null);
    const _user = ref(null);

    if (user.value) {
        const documentRef = doc(projectFirestore, collectionPath, user.value.uid);
        const unsubscribe = onSnapshot(documentRef, (doc) => {
            if (doc.exists()) {
                _user.value = { ...doc.data() };
                error.value = null; // Clear any previous errors
            } else {
                error.value = `User with the given UID (${user.value.uid}) doesn't exist`;
                _user.value = null;
            }
        }, (err) => {
            error.value = err.message;
            _user.value = null;
        });

        watchEffect((onInvalidate) => {
            onInvalidate(() => {
                unsubscribe();
            });
        });
    } else {
        error.value = "User is not authenticated.";
    }

    return { error, _user };
};

export default getUserDoc;
