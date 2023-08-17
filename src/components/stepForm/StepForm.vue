<template>
  <div>
    <!-- Transition? -->
    <Step1 v-if="step === 1" />
    <Step2 v-if="step === 2" />
    <Step3 v-if="step === 3" @submit="$emit('submit')" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useStepStore } from "@/stores/step";

import Step1 from "@/components/stepForm/Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";

const { step } = storeToRefs(useStepStore());

defineEmits(["submit"]);
</script>

<style lang="css">
fieldset {
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 2rem 0;
}
legend {
  margin: 0 0 0.5rem 0.5rem;
  font-size: 14px;
  font-weight: 500;
}
form {
  font-size: 14px;
  margin: 2rem 0 calc(85px + 2rem);
}
.buttons {
  display: flex;
  justify-content: space-between;
}
ion-item {
  box-shadow: var(--element-box-shadow);
}
ion-button {
  --border-radius: var(--border-radius-m);
}
</style>
