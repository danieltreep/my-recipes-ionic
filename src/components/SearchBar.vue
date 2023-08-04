<template>
  <ion-searchbar v-model="searchTerm"></ion-searchbar>
</template>

<script setup lang="ts">
import { IonSearchbar } from "@ionic/vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";

const { searchTerm } = storeToRefs(useSearchStore());
</script>

<style lang="css" scoped>
ion-searchbar {
  --border-radius: var(--border-radius-m);
  --box-shadow: var(--element-box-shadow);
  -webkit-padding-start: 0;
  -webkit-padding-end: 0;
}
</style>
