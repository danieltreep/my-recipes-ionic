<template>
  <ion-page>
    <MainHeader />
    <ion-content class="ion-padding">
      <CategoryList v-if="!searchTerm" />
      <SearchList v-if="searchTerm" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// Ionic
import { IonPage, IonContent } from "@ionic/vue";

// External
import { onMounted } from "vue";

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

onMounted(async () => {
  await fetchRecipes();
});
</script>

<style lang="css"></style>
