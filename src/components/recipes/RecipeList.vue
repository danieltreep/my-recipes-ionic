<template>
  <div class="recipeList" v-if="recipes!.length">
    <RecipeThumbnail
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
  <div v-else>
    <div class="niks">
      <p>Je hebt nog geen favorieten</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeThumbnail from "./RecipeThumbnail.vue";

import { useRecipesStore } from "@/stores/recipes";

import type { Recipe } from "@/types/Recipe";
defineProps({
  recipes: Array<Recipe>,
});

const { fetchRecipes } = useRecipesStore();

await fetchRecipes();
</script>

<style lang="css" scoped>
.niks {
  text-align: center;
}
</style>
