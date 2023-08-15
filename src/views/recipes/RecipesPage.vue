<template>
  <ion-page>
    <MainHeader />
    <ion-content class="ion-padding">
      <!-- <CategoryList v-if="!searchTerm" /> -->
      <SearchList v-if="searchTerm" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Ionic
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";

// Components
import CategoryList from "@/components/categories/CategoryList.vue";
import MainHeader from "@/components/MainHeader.vue";
import SearchList from "@/components/recipes/SearchList.vue";

// Stores
import { useRecipesStore } from "@/stores/recipes";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";

const { searchTerm } = storeToRefs(useSearchStore());

const { fetchRecipes } = useRecipesStore();

onIonViewWillEnter(async () => {
  await fetchRecipes();
});
</script>

<style lang="css"></style>
