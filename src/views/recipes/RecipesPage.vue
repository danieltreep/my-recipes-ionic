<template>
  <ion-page>
    <MainHeader />
    <ion-content class="ion-padding">
      <Suspense>
        <RecipeList :recipes="categoryRecipes()" />
        <template #fallback>
          <SuspenseList />
        </template>
      </Suspense>
      <NewRecipeModal />
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
import NewRecipeModal from "./NewRecipeModal.vue";

import { useRecipesStore } from "@/stores/recipes";
import { useFilteredRecipesStore } from "@/stores/filteredRecipes";
import { storeToRefs } from "pinia";

const { categoryRecipes } = storeToRefs(useFilteredRecipesStore());
</script>

<style lang="css">
ion-content {
  --ion-padding: 1.5rem;
  --background: var(--background-color);
}
</style>
