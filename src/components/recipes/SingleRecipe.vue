<template>
  <div>
    <section class="information">
      <div class="detailsSection">
        <p>
          {{ recipe.category.charAt(0).toUpperCase()
          }}{{ recipe.category.slice(1) }} &nbsp; | &nbsp; {{ recipe.time }} min
        </p>
      </div>
      <h1>
        {{ recipe.title.charAt(0).toUpperCase() }}{{ recipe.title.slice(1) }}
      </h1>
      <p class="description">
        {{ recipe.description?.charAt(0).toUpperCase()
        }}{{ recipe.description?.slice(1) }}
      </p>
    </section>

    <section class="tagsSection">
      <!-- <h3>Tags</h3> -->
      <TagList :tags="tags" />
    </section>

    <section>
      <div class="ingredients-header">
        <h3>Ingredients</h3>
        <PeopleCounter />
      </div>
      <IngredientsList :ingredients="recipe.ingredients" :edit="false" />
    </section>

    <section>
      <h3>Steps</h3>
      <ul>
        <StepsListItemVue
          v-for="(step, index) in recipe.steps"
          :key="index"
          :step="step"
          :index="index"
          :show-edit="false"
        />
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "@/types/Recipe";
import IngredientsList from "@/components/ingredients/IngredientsList.vue";
import StepsListItemVue from "../stepForm/StepsListItem.vue";

import TagList from "../tags/TagList.vue";
import PeopleCounter from "../ingredients/PeopleCounter.vue";

defineProps<{
  recipe: Recipe;
}>();

const tags = ["Seafood", "Soup"];
</script>

<style lang="css" scoped>
/* Information section */
section {
  margin: 1.5rem 0;
  /* text-align: center; */
}
.detailsSection {
  color: var(--font-label);
  font-size: 12px;
}

h1 {
  margin: 0 0 1rem;
  font-size: 24px;
}
.description {
  font-size: 14px;
  color: var(--font-color);
}
h3 {
  font-size: 16px;
  margin-bottom: 0.5rem;
}
ion-icon {
  color: var(--primary-color);
}
.ingredients-header {
  display: flex;
  justify-content: space-between;
}
</style>
