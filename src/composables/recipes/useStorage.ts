import { ref as vueRef, type Ref } from "vue";
import { storage } from "@/firebase/config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth } from "@/firebase/config";

const useStorage = () => {
  const error = vueRef(null);
  const url = vueRef(""); //
  const filePath = vueRef<string>(""); // Store filepath to use in uploadImage

  const uploadImage = async (file: File) => {
    filePath.value = `images/${auth.currentUser!.uid}/${file.name}`;
    const storageRef = ref(storage, filePath.value);

    console.log(storageRef);

    try {
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          // console.log('uploaded a file')
          console.log(snapshot);
        })
        .catch((err) => (error.value = err.message));

      await getDownloadURL(storageRef)
        .then((downloadURL) => {
          url.value = downloadURL;
        })
        .catch((err) => (error.value = err));
    } catch (err: any) {
      error.value = err.message;
      console.log(err.message);
    }
  };

  const deleteImage = async (path: string) => {
    const storageRef = ref(storage, path);

    await deleteObject(storageRef)
      .then(() => console.log("deleted image"))
      .catch((err) => console.error(err));
  };

  return { url, error, filePath, uploadImage, deleteImage };
};

export default useStorage;
