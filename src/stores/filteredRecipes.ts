import { computed, ref } from "vue";
import type { Recipe } from "@/types/Recipe";
import { defineStore, storeToRefs } from "pinia";
import { useRecipesStore } from "./recipes";
import { useSearchStore } from "./search";

export const useFilteredRecipesStore = defineStore("FilteredRecipes", () => {
  // Search is the first layer of filtering.
  const { matchingSearchRecipes } = storeToRefs(useSearchStore());

  //   Save the category
  const category = ref<String>("all");

  // Categories are the second level of filtering
  const categoryRecipes = computed(() => {
    return () => {
      if (category.value === "all") {
        return matchingSearchRecipes.value;
      } else {
        return matchingSearchRecipes.value.filter(
          (recipe) => recipe.category === category.value
        );
      }
    };
  });

  // The filter tags are the third layer of filtering
  const filteredRecipes = computed(() => {});

  return {
    categoryRecipes,
    filteredRecipes,
    category,
  };
});
