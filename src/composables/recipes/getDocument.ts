import { db } from "@/firebase/config";
import { ref, type Ref } from "vue";
import { collection, getDoc, query, doc, where } from "firebase/firestore";
import type { Recipe } from "@/types/Recipe";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";
import { auth } from "@/firebase/config";

const { updateRecipe } = useSelectedRecipeStore();

const getDocument = async (id: string) => {
  const recipe = ref<Recipe | any>({
    title: "",
    people: 0,
    time: 0,
    category: "",
    ingredients: [],
    steps: [],
    favorite: false,
  });

  const error = ref(null);

  // Register the firestore collection reference
  const docRef = doc(db, "users", auth.currentUser!.uid, "recipes", id);

  const response = await getDoc(docRef);

  if (response.exists()) {
    recipe.value = response.data();
    // console.log(response.data())
  } else {
    console.log("diddnt fijsdf");
  }
  error.value = null;
  // console.log(recipe.value)
  updateRecipe(recipe.value);

  return { recipe, error };
};

export default getDocument;
