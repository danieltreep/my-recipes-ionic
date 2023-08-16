import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useRecipesStore } from "./recipes";

export const useSearchStore = defineStore("Search", () => {
  const { recipes } = storeToRefs(useRecipesStore());
  const searchTerm = ref("");

  const matchingSearchRecipes = computed(() => {
    return recipes.value.filter((recipe) => {
      return recipe.title
        .toUpperCase()
        .includes(searchTerm.value.toUpperCase());
    });
  });

  return { searchTerm, matchingSearchRecipes };
});
