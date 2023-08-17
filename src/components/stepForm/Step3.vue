<template>
  <form>
    <fieldset>
      <legend>Steps</legend>
      <ul>
        <StepsListItem
          v-for="(step, index) in newRecipe.steps"
          :key="index"
          :step="step"
          :index="index"
          :show-edit="true"
        />
      </ul>
      <AddSteps />
    </fieldset>
    <div class="buttons">
      <ion-button @click.prevent="decrement" class="prev" fill="clear">
        <ion-icon :icon="chevronBack"></ion-icon>
        Previous
      </ion-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";

// External
import { storeToRefs } from "pinia";
import { useStepStore } from "@/stores/step";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Composables
import useCollection from "@/composables/recipes/useCollection";
import useStorage from "@/composables/recipes/useStorage";

// Stores
import { useNewRecipeStore } from "@/stores/newRecipe";

// Components
import StepsListItem from "./StepsListItem.vue";
import AddSteps from "./AddSteps.vue";
import { chevronBack, chevronForward } from "ionicons/icons";
import ErrorMessage from "../error/ErrorMessage.vue";

// Functions
const { isPending } = useCollection();
const { decrement } = useStepStore();

// Refs
const { newRecipe } = storeToRefs(useNewRecipeStore());
const error = ref(false);
</script>

<style lang="css" scoped>
ul {
  padding-left: 0;
}

li:not(:last-child) {
  border-bottom: 3px solid var(--background-color);
}
.error {
  text-align: center;
  font-weight: 500;
  color: red;
  margin-top: 2rem;
}
</style>
