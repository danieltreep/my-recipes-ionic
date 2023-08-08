import { db } from "@/firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { auth } from "@/firebase/config";

const setFavorite = async (id: string, value: boolean) => {
  const docRef = doc(db, "users", auth.currentUser!.uid, "recipes", id);

  await updateDoc(docRef, {
    favorite: value,
  });
};

export default setFavorite;
