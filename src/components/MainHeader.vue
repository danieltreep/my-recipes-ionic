<template>
  <ion-header>
    <div class="top-section">
      <SearchBar @activate="searchActive = !searchActive" />

      <Transition name="fade">
        <h1 v-if="!searchActive">Recipes</h1>
      </Transition>

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
import { search } from "ionicons/icons";
import CategoryList from "./categories/CategoryList.vue";
import { ref } from "vue";

const searchActive = ref(false);
</script>

<style lang="css" scoped>
.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem 0 1.5rem;
  position: relative;
}
h1 {
  margin: 0;
  /* font-size: 32px; */
}
ion-icon {
  color: var(--font-color);
  font-size: 20px;
}
ion-header {
  box-shadow: var(--element-box-shadow);
}
ion-button {
  /* align-items: flex-end; */
  min-height: 0 !important;
  --height: 40px;
}
/* Transitions */

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 0.1s;
}
.fade-enter-active {
  transition: all 0.1s 0.1s;
}
</style>
