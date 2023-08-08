<template>
  <div class="addStep">
    <ion-item>
      <ion-textarea
        v-model="step"
        placeholder="Beschrijf de stap hier ..."
      ></ion-textarea>
    </ion-item>
    <ion-button @click.prevent="handleAddStep"> Voeg stap toe </ion-button>

    <ErrorMessage
      message="Voer tekst in voor u de stap toevoegd"
      v-if="error"
    />
  </div>
</template>

<script setup lang="ts">
import { IonTextarea, IonItem, IonButton } from "@ionic/vue";
import { ref } from "vue";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";
import ErrorMessage from "../error/ErrorMessage.vue";

const { addStep } = useSelectedRecipeStore();

const step = ref("");
const error = ref(false);

const handleAddStep = () => {
  if (!step.value.length) {
    error.value = true;
    return;
  } else {
    addStep(step.value);
    step.value = "";
    error.value = false;
  }
};
</script>

<style lang="css" scoped>
.addStep {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.box {
  background-color: var(--card-color);
  padding: 0.7rem;
  border-radius: var(--border-radius-m);
  box-shadow: var(--box-shadow);
}
textarea {
  width: 100%;
  border: none;
  outline: transparent;
}
button {
  width: fit-content;
  border: 1px solid var(--secondary-color);
}
</style>
