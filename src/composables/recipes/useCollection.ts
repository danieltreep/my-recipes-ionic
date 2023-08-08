// Add to a collection
import { ref } from "vue";
import { db } from "@/firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import type { Recipe } from "@/types/Recipe";
import { auth } from "@/firebase/config";

const useCollection = (col: string) => {
  const error = ref(null);
  const isPending = ref<boolean>(false);

  const addDocument = async (document: Recipe) => {
    error.value = null;
    isPending.value = true;

    try {
      const response = await addDoc(
        collection(db, "users", auth.currentUser!.uid, col),
        document
      );

      // Immediately add document id
      await updateDoc(
        doc(db, "users", auth.currentUser!.uid, col, response.id),
        {
          ...document,
          id: response.id,
        }
      );

      isPending.value = false;
      return response.id;
    } catch (err: any) {
      error.value = err.message;
      console.log(err.message);
      isPending.value = false;
    }
  };

  return { error, addDocument, isPending };
};

export default useCollection;
