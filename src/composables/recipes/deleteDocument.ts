import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "@/firebase/config";

const useDeleteDocument = async (recipeId: string) => {
  const docRef = doc(db, "users", auth.currentUser!.uid, "recipes", recipeId);

  await deleteDoc(docRef)
    .then(() => {
      console.log("deleted recipe");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default useDeleteDocument;
