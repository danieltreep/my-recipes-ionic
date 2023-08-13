<template>
  <ion-page>
    <ion-content class="ion-padding">
      <header>
        <h3>Nieuw recept</h3>
        <StepIndicators />
      </header>
      <StepForm />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import StepForm from "@/components/stepForm/StepForm.vue";
import StepIndicators from "@/components/stepForm/StepIndicators.vue";
</script>

<style lang="css" scoped>
h3 {
  text-align: center;
  margin: 1rem 0 3rem;
}
</style>
