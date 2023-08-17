<template>
  <form @submit.prevent="handleSubmit">
    <ErrorMessage message="Add an ingredient" v-if="error" />

    <fieldset>
      <legend>Ingredients</legend>
      <IngredientsList :ingredients="newRecipe.ingredients" :edit="true" />
      <AddIngredient />
    </fieldset>

    <div class="buttons">
      <ion-button @click.prevent="decrement" class="prev" fill="clear">
        <ion-icon :icon="chevronBack"></ion-icon>
        Previous
      </ion-button>
      <ion-button type="submit" class="next" fill="outline">
        Next
        <ion-icon :icon="chevronForward"></ion-icon>
      </ion-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import AddIngredient from "./AddIngredient.vue";
import IngredientsList from "@/components/ingredients/IngredientsList.vue";
import { useNewRecipeStore } from "@/stores/newRecipe";
import { storeToRefs } from "pinia";
import { useStepStore } from "@/stores/step";
import { ref } from "vue";
import { IonButton, IonIcon } from "@ionic/vue";
import { chevronBack, chevronForward } from "ionicons/icons";
import ErrorMessage from "../error/ErrorMessage.vue";

const { increment, decrement } = useStepStore();
const { newRecipe } = storeToRefs(useNewRecipeStore());

const error = ref(false);

const handleSubmit = () => {
  if (!newRecipe.value.ingredients.length) {
    error.value = true;
  } else {
    increment();
  }
};
</script>

<style lang="css" scoped>
.error {
  text-align: center;
  font-weight: 500;
  color: red;
  margin-top: 2rem;
}
</style>
