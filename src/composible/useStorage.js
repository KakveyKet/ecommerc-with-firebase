// useStorage.js
import { getStorage, ref as RefFile, uploadBytes, getDownloadURL } from "firebase/storage";
import getUser from "./getUser";
import { ref as toRef } from "vue"
const { user } = getUser();
const storage = getStorage();

const useStorage = () => {
    const error = toRef(null);
    const url = toRef(null);
    const filePath = toRef(null);

    const uploadImage = async (file) => {
        filePath.value = `images/${user.value.uid}/${file.name}`;
        const storageRef = RefFile(storage, filePath.value);
        try {
            await uploadBytes(storageRef, file);
            url.value = await getDownloadURL(storageRef);
        } catch (uploadError) {
            console.error("Error uploading file:", uploadError);
            error.value = uploadError.message;
            url.value = null;
            filePath.value = null;
        }
    };
    return { uploadImage, error, filePath, url };
};

export default useStorage;
