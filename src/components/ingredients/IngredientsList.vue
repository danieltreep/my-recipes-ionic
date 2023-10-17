<template>
  <ul>
    <IngredientsListItem
      v-for="(ingredient, index) in ingredients"
      :key="index"
      :index="index"
      :ingredient="ingredient"
      :edit="edit"
    />
  </ul>
</template>

<script setup lang="ts">
import IngredientsListItem from "./IngredientsListItem.vue";
import type { Ingredient } from "@/types/Ingredient";
import PeopleCounter from "./PeopleCounter.vue";

defineProps<{
  ingredients: Array<Ingredient>;
  edit: boolean;
}>();
</script>

<style lang="css" scoped>
ul {
  background-color: var(--card-color);
  padding-left: 0;
}

li:not(:last-child) {
  border-bottom: 1px solid var(--lines-color);
}
</style>
