<template>
  <ion-page>
    <MainHeader />
    <ion-content class="ion-padding">
      <Suspense>
        <RecipeList />
        <template #fallback>
          <SuspenseList />
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Ionic
import { IonPage, IonContent } from "@ionic/vue";

// Components
import MainHeader from "@/components/MainHeader.vue";
import RecipeList from "@/components/recipes/RecipeList.vue";
import SuspenseList from "@/components/suspense/SuspenseList.vue";
</script>

<style lang="css">
ion-content {
  --ion-padding: 1.5rem;
  --background: var(--background-color);
}
</style>
