<template>
  <ion-header>
    <div class="top-section">
      <SearchBar />

      <FilterModal />
    </div>

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

import CategoryList from "./categories/CategoryList.vue";
</script>

<style lang="css" scoped>
.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 0 1.5rem;
  position: relative;
  gap: 1rem;
  margin-bottom: 2rem;
}

ion-icon {
  color: var(--font-color);
  /* font-size: 16px; */
}
ion-header {
  box-shadow: none;
}
ion-button {
  /* align-items: flex-end; */
  min-height: 0 !important;
  --height: 40px;
}
</style>
