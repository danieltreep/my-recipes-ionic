<template>
  <ion-header class="ion-padding">
    <img src="@/assets/logo.svg" />

    <SearchBar />
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader } from "@ionic/vue";
import SearchBar from "@/components/SearchBar.vue";
</script>

<style lang="css" scoped>
img {
  max-height: 60px;
  margin: 0 auto;
}
</style>
