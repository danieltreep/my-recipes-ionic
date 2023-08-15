<template>
  <ion-header>
    <div class="top-section">
      <ion-button fill="clear" color="dark" class="ion-no-padding">
        <ion-icon :icon="search" slot="icon-only"></ion-icon>
      </ion-button>
      <h1>Recipes</h1>

      <FilterModal />
    </div>

    <!-- <SearchBar /> -->
    <CategoryList />
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonIcon,
  IonButton,
  IonModal,
  IonContent,
} from "@ionic/vue";
import SearchBar from "@/components/SearchBar.vue";
import TagList from "@/components/tags/TagList.vue";
import FilterModal from "@/components/filter/FilterModal.vue";
import { search } from "ionicons/icons";
import CategoryList from "./categories/CategoryList.vue";
</script>

<style lang="css" scoped>
.top-section {
  display: flex;
  justify-content: space-between;
  padding: 2rem 1.5rem 0 1.5rem;
}
h1 {
  margin: 0 0 0.5rem 0;
  font-size: 32px;
}
ion-icon {
  color: var(--font-color);
}
ion-header {
  box-shadow: var(--element-box-shadow);
}
</style>
