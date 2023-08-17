<template>
  <div class="addStep">
    <ion-item>
      <ion-textarea
        v-model="step"
        placeholder="Describe the step ..."
      ></ion-textarea>
    </ion-item>
    <ion-button @click.prevent="handleAddStep" fill="outline">
      Add step
    </ion-button>

    <ErrorMessage message="The step is empty" v-if="error" />
  </div>
</template>

<script setup lang="ts">
import { IonTextarea, IonItem, IonButton } from "@ionic/vue";
import { ref } from "vue";
import { useNewRecipeStore } from "@/stores/newRecipe";
import ErrorMessage from "../error/ErrorMessage.vue";

const { addStep } = useNewRecipeStore();

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
ion-item {
  --box-shadow: var(--element-box-shadow);
  border-radius: var(--border-radius-m);
}
</style>
