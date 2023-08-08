<template>
  <div class="error">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: String;
}>();
</script>

<style lang="css" scoped></style>
