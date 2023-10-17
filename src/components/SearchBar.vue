<template>
  <ion-searchbar
    v-model="searchTerm"
    show-cancel-button="never"
    show-clear-button="focus"
    class="ion-no-padding"
    placeholder="Search recipes"
  ></ion-searchbar>
</template>

<script setup lang="ts">
import { IonSearchbar } from "@ionic/vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";

const { searchTerm } = storeToRefs(useSearchStore());
</script>

<style lang="css" scoped>
ion-searchbar {
  --border-radius: 10px;
  --box-shadow: 0px 0px 4px #00000020;
  height: 40px;

  transition: 0.5s;
  font-size: 14px !important;
  display: flex;
  align-items: center;
}

ion-icon {
  font-size: 20px;
}
</style>
