<template>
  <div class="recipeList" v-if="categoryRecipes().length">
    <RecipeThumbnail
      v-for="recipe in categoryRecipes()"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
  <div v-else>
    <NoRecipesVue />
  </div>
</template>

<script setup lang="ts">
import NoRecipesVue from "@/components/recipes/NoRecipes.vue";
// import RecipeListSuspense from '@/components/suspense/RecipeListSuspense.vue'
import RecipeThumbnail from "./RecipeThumbnail.vue";

import { useRecipesStore } from "@/stores/recipes";
import { useFilteredRecipesStore } from "@/stores/filteredRecipes";
import { storeToRefs } from "pinia";

const { fetchRecipes } = useRecipesStore();
const { categoryRecipes } = storeToRefs(useFilteredRecipesStore());

await fetchRecipes();
</script>

<style lang="css" scoped></style>
