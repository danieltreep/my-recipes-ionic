<template>
  <div class="recipeList">
    <SuspenseItem v-for="(item, index) in 4" :key="index" />
  </div>
</template>

<script setup lang="ts">
import SuspenseItem from "@/components/suspense/SuspenseItem.vue";
</script>

<style lang="css" scoped></style>
