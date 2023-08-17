<template>
  <div class="category-container">
    <div class="category-slider">
      <Suspense>
        <CategoryCard
          v-for="category in categories"
          :key="category"
          :cat="category"
        />
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CategoryCard from "./CategoryCard.vue";

const categories = ref<Array<string>>([
  "all",
  "breakfast",
  "lunch",
  "dinner",
  "starter",
  "dessert",
  "side",
  "snack",
  "drink",
]);
</script>

<style lang="css" scoped>
.category-container {
  overflow: scroll;
  padding-block: 2rem 1.5rem;
}
.category-slider {
  display: grid;
  grid-template-columns: repeat(9, 70px);
  gap: 8px;
  width: fit-content;
  margin-inline: 1.5rem;
}
</style>
