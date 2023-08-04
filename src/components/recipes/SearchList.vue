<template>
  <div>
    <RecipeList :recipes="recipeList" />
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/search";
import RecipeList from "./RecipeList.vue";
import { storeToRefs } from "pinia";

const { recipeList } = storeToRefs(useSearchStore());
</script>

<style lang="css"></style>
