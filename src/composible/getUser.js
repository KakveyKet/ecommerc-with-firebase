import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

const user = ref(null);

const initializeAuthStateListener = () => {
    projectAuth.onAuthStateChanged((_user) => {
        if (_user) {
            user.value = _user;
        } else {
            user.value = null;
        }
    });
};

const getUser = () => {
    // Initialize the auth state listener when the composable is first used
    initializeAuthStateListener();
    return { user };
};

export default getUser;
