<template>
  <ion-page>
    <MainHeader />
    <ion-content class="ion-padding">
      <RecipeList :recipes="categoryRecipes()" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Ionic
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";

// Components
import MainHeader from "@/components/MainHeader.vue";
import RecipeList from "@/components/recipes/RecipeList.vue";

// Stores
import { useRecipesStore } from "@/stores/recipes";
import { useFilteredRecipesStore } from "@/stores/filteredRecipes";
import { storeToRefs } from "pinia";

const { fetchRecipes } = useRecipesStore();
const { recipes } = storeToRefs(useRecipesStore());
const { categoryRecipes } = storeToRefs(useFilteredRecipesStore());

onIonViewWillEnter(async () => {
  await fetchRecipes();
});
</script>

<style lang="css">
ion-content {
  --ion-padding: 1.5rem;
  --background: var(--background-color);
}
</style>
