<template>
  <div class="tags-container">
    <BaseTag v-for="tag in tags" :key="tag" :name="tag" />
  </div>
</template>

<script setup lang="ts">
import BaseTag from "@/components/tags/BaseTag.vue";

defineProps({
  tags: Array<string>,
});
</script>

<style lang="css" scoped>
.tags-container {
  /* padding-block: 1rem; */
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
