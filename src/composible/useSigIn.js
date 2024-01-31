import { getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref(null);
const isPending = ref(false);

const signin = async (email, password, displayName) => {
    try {
        isPending.value = true;

        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(projectAuth, email, password);

        // Update the user profile with the display name
        await updateProfile(userCredential.user, { displayName });

        // Reset error in case of a previous error
        error.value = null;
    } catch (err) {
        // Handle errors
        error.value = err.message;
    } finally {
        // Reset pending state
        isPending.value = false;
    }
};

const useSignIn = () => {
    return { error, isPending, signin };
};

export default useSignIn;
