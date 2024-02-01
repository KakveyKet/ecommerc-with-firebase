// useStorage.js
import { getStorage, ref as RefFile, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import getUser from "./getUser";
import { ref as toRef } from "vue";

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

    const deleteImage = async () => {
        if (url.value && filePath.value) {
            const storageRef = RefFile(storage, filePath.value);
            try {
                await deleteObject(storageRef);
                // Clear values after successful deletion
                url.value = null;
                filePath.value = null;
            } catch (deleteError) {
                console.error("Error deleting file:", deleteError);
                error.value = deleteError.message;
            }
        }
    };

    return { uploadImage, deleteImage, error, filePath, url };
};

export default useStorage;
