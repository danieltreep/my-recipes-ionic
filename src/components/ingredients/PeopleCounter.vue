<template>
  <div class="counter">
    <span tabindex="0" @click="handleDecrement">-</span>
    <ion-icon :icon="personOutline"></ion-icon>
    <p>{{ selectedRecipe.people }}</p>
    <span tabindex="0" @click="handleIncrement">+</span>
  </div>
</template>

<script setup lang="ts">
import { IonPage, IonIcon } from "@ionic/vue";

import { storeToRefs } from "pinia";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";
import type { Ingredient } from "@/types/Ingredient";
import { timeOutline, personOutline, restaurant } from "ionicons/icons";

const { selectedRecipe } = storeToRefs(useSelectedRecipeStore());

const handleDecrement = () => {
  console.log();
  if (selectedRecipe.value.people! > 1) {
    selectedRecipe.value.people!--;

    selectedRecipe.value.ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.amount) {
        ingredient.amount =
          (ingredient.amount.valueOf() / (selectedRecipe.value.people! + 1)) *
          selectedRecipe.value.people!;
      }
    });
  }
};

const handleIncrement = () => {
  selectedRecipe.value.people!++;

  selectedRecipe.value.ingredients.forEach((ingredient: Ingredient) => {
    if (ingredient.amount) {
      ingredient.amount =
        (ingredient.amount.valueOf() / (selectedRecipe.value.people! - 1)) *
        selectedRecipe.value.people!;
    }
  });
};
</script>

<style lang="css" scoped>
ul {
  background-color: var(--card-color);
  padding-left: 0;
}

li:not(:last-child) {
  border-bottom: 1px solid var(--lines-color);
}

.counter {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 14px;
}
.counter span {
  border: 1px solid var(--lines-color);
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-s);
}
</style>
