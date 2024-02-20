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
// projectAuth.onAuthStateChanged(async (_user) => {
//     if (_user) {
//         const idTokenResult = await _user.getIdTokenResult();
//         user.value = _user;
//         user.value.admin = idTokenResult.claims.admin

//     } else {
//         user.value = null;
//     }
// })
const getUser = () => {
    // Initialize the auth state listener when the composable is first used
    initializeAuthStateListener();
    return { user };
};

export default getUser;
